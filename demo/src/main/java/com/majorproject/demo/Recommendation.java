package com.majorproject.demo;

public class Recommendation {

    private String collegeName;
    private String branch;
    private String seatType;

    private Double minCutoff;
    private Double meanCutoff;
    private Double maxCutoff;

    private String recommendation;

    public Recommendation(
            String collegeName,
            String branch,
            String seatType,
            Double minCutoff,
            Double meanCutoff,
            Double maxCutoff,
            String recommendation) {

        this.collegeName = collegeName;
        this.branch = branch;
        this.seatType = seatType;
        this.minCutoff = minCutoff;
        this.meanCutoff = meanCutoff;
        this.maxCutoff = maxCutoff;
        this.recommendation = recommendation;
    }

    public String getCollegeName() {
        return collegeName;
    }

    public String getBranch() {
        return branch;
    }

    public String getSeatType() {
        return seatType;
    }

    public Double getMinCutoff() {
        return minCutoff;
    }

    public Double getMeanCutoff() {
        return meanCutoff;
    }

    public Double getMaxCutoff() {
        return maxCutoff;
    }

    public String getRecommendation() {
        return recommendation;
    }
}