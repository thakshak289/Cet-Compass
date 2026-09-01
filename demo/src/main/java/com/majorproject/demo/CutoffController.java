package com.majorproject.demo;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cutoffs")
@CrossOrigin(origins = "*")
public class CutoffController {

    private final CutoffService cutoffService;

    public CutoffController(CutoffService cutoffService) {
        this.cutoffService = cutoffService;
    }

    @GetMapping
    public List<Cutoff> getAllCutoffs() {
        return cutoffService.getAllCutoffs();
    }
    @GetMapping("/branch")
    public List<Cutoff> getByBranch(@RequestParam String branch) {
        return cutoffService.getByBranch(branch);
    }
    @GetMapping("/search")
    public List<Cutoff> search(
            @RequestParam String branch,
            @RequestParam String seatType) {

        return cutoffService.getByBranchAndSeatType(branch, seatType);
    }
    @GetMapping("/recommend")
    public List<Recommendation> getRecommendations(
            @RequestParam String branch,
            @RequestParam String seatType,
            @RequestParam double percentile) {

        return cutoffService.getRecommendations(
                branch,
                seatType,
                percentile
        );
    }
    @PostMapping("/recommendations")
    public List<Recommendation> getRecommendations(
            @RequestBody RecommendationRequest request) {

        return cutoffService.getRecommendations(request);
    }
}