package com.example.asset.dto;

import java.time.LocalDateTime;

public class AssetHistoryResponse {
    private Long id;
    private String action;
    private String assetName;
    private String assetCategory;
    private String assignedTo;
    private LocalDateTime timestamp;

    public AssetHistoryResponse(Long id, String action, String assetName, String assetCategory, String assignedTo, LocalDateTime timestamp) {
        this.id = id;
        this.action = action;
        this.assetName = assetName;
        this.assetCategory = assetCategory;
        this.assignedTo = assignedTo;
        this.timestamp = timestamp;
    }

    // Getters & Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getAction() { return action; }
    public void setAction(String action) { this.action = action; }

    public String getAssetName() { return assetName; }
    public void setAssetName(String assetName) { this.assetName = assetName; }

    public String getAssetCategory() { return assetCategory; }
    public void setAssetCategory(String assetCategory) { this.assetCategory = assetCategory; }

    public String getAssignedTo() { return assignedTo; }
    public void setAssignedTo(String assignedTo) { this.assignedTo = assignedTo; }

    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
}
