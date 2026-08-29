package com.majorproject.demo;

import jakarta.persistence.*;

@Entity
@Table(name = "cutoffs")
public class Cutoff {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "college_name")
    private String collegeName;

    @Column(name = "seat_type")
    private String seatType;

    @Column(name = "branch")
    private String branch;

    @Column(name = "record_count")
    private Integer recordCount;

    @Column(name = "max_cutoff")
    private Double maxCutoff;

    @Column(name = "min_cutoff")
    private Double minCutoff;

    @Column(name = "mean_cutoff")
    private Double meanCutoff;

    // Getters and Setters

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCollegeName() {
        return collegeName;
    }

    public void setCollegeName(String collegeName) {
        this.collegeName = collegeName;
    }

    public String getSeatType() {
        return seatType;
    }

    public void setSeatType(String seatType) {
        this.seatType = seatType;
    }

    public String getBranch() {
        return branch;
    }

    public void setBranch(String branch) {
        this.branch = branch;
    }

    public Integer getRecordCount() {
        return recordCount;
    }

    public void setRecordCount(Integer recordCount) {
        this.recordCount = recordCount;
    }

    public Double getMaxCutoff() {
        return maxCutoff;
    }

    public void setMaxCutoff(Double maxCutoff) {
        this.maxCutoff = maxCutoff;
    }

    public Double getMinCutoff() {
        return minCutoff;
    }

    public void setMinCutoff(Double minCutoff) {
        this.minCutoff = minCutoff;
    }

    public Double getMeanCutoff() {
        return meanCutoff;
    }

    public void setMeanCutoff(Double meanCutoff) {
        this.meanCutoff = meanCutoff;
    }
}