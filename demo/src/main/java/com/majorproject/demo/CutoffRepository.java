package com.majorproject.demo;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CutoffRepository extends JpaRepository<Cutoff, Integer> {

    List<Cutoff> findByBranch(String branch);

    List<Cutoff> findByBranchAndSeatType(String branch, String seatType);
}