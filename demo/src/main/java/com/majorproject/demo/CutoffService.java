package com.majorproject.demo;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CutoffService {

    private final CutoffRepository cutoffRepository;

    public CutoffService(CutoffRepository cutoffRepository) {
        this.cutoffRepository = cutoffRepository;
    }

    public List<Cutoff> getAllCutoffs() {
        return cutoffRepository.findAll();
    }
    public List<Cutoff> getByBranch(String branch) {
        return cutoffRepository.findByBranch(branch);
    }
    public List<Cutoff> getByBranchAndSeatType(String branch, String seatType) {
        return cutoffRepository.findByBranchAndSeatType(branch, seatType);
    }
    public List<Recommendation> getRecommendations(
            String branch,
            String seatType,
            double percentile) {

        List<Cutoff> cutoffs =
                cutoffRepository.findByBranchAndSeatType(branch, seatType);

        return cutoffs.stream()
                .map(cutoff -> {

                    String result;

                    if (percentile >= cutoff.getMaxCutoff()) {
                        result = "HIGH CHANCE";
                    } else if (percentile >= cutoff.getMeanCutoff()) {
                        result = "GOOD CHANCE";
                    } else if (percentile >= cutoff.getMinCutoff()) {
                        result = "POSSIBLE";
                    } else {
                        result = "LOW CHANCE";
                    }

                    return new Recommendation(
                            cutoff.getCollegeName(),
                            cutoff.getBranch(),
                            cutoff.getSeatType(),
                            cutoff.getMinCutoff(),
                            cutoff.getMeanCutoff(),
                            cutoff.getMaxCutoff(),
                            result
                    );
                })
                .toList();
    }
    private String getSeatType(String category) {

        switch (category.toUpperCase()) {

            case "OPEN":
                return "GOPENS";

            case "OBC":
                return "GOBCS";

            case "SC":
                return "GSCS";

            case "ST":
                return "GSTS";

            case "VJDT":
                return "GVJS";

            case "NTB":
                return "GNT1S";

            case "NTC":
                return "GNT2S";

            case "NTD":
                return "GNT3S";

            case "EWS":
                return "EWS";

            default:
                throw new IllegalArgumentException(
                        "Invalid category: " + category
                );
        }
    }
    public List<Recommendation> getRecommendations(
            RecommendationRequest request) {

        String seatType = getSeatType(request.getCategory());

        List<Cutoff> cutoffs =
                cutoffRepository.findByBranchAndSeatType(
                        request.getBranch(),
                        seatType
                );

        return cutoffs.stream()

                // Remove colleges where percentile is below minimum cutoff
                .filter(cutoff ->
                        request.getPercentile() >= cutoff.getMinCutoff()
                )

                // Convert cutoff into recommendation
                .map(cutoff -> {

                    String result;

                    if (request.getPercentile() >= cutoff.getMaxCutoff()) {
                        result = "HIGH CHANCE";

                    } else if (request.getPercentile() >= cutoff.getMeanCutoff()) {
                        result = "GOOD CHANCE";

                    } else {
                        result = "POSSIBLE";
                    }

                    return new Recommendation(
                            cutoff.getCollegeName(),
                            cutoff.getBranch(),
                            cutoff.getSeatType(),
                            cutoff.getMinCutoff(),
                            cutoff.getMeanCutoff(),
                            cutoff.getMaxCutoff(),
                            result
                    );
                })

                // Put High Chance → Good Chance → Possible
                .sorted((a, b) -> {

                    int rankA = getRecommendationRank(
                            a.getRecommendation()
                    );

                    int rankB = getRecommendationRank(
                            b.getRecommendation()
                    );

                    if (rankA != rankB) {
                        return Integer.compare(rankA, rankB);
                    }

                    // Within same category, higher mean cutoff first
                    return Double.compare(
                            b.getMeanCutoff(),
                            a.getMeanCutoff()
                    );
                })

                .toList();
    }
    private int getRecommendationRank(String recommendation) {

        switch (recommendation) {

            case "HIGH CHANCE":
                return 1;

            case "GOOD CHANCE":
                return 2;

            case "POSSIBLE":
                return 3;

            default:
                return 4;
        }
    }
}
