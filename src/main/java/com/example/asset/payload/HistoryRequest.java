package com.example.asset.payload;

public class HistoryRequest {
    private Long assetId;
    private String action;
    private String assignedTo; // Who it was assigned to in history

    // Getters and Setters
    public Long getAssetId() { return assetId; }
    public void setAssetId(Long assetId) { this.assetId = assetId; }

    public String getAction() { return action; }
    public void setAction(String action) { this.action = action; }

    public String getAssignedTo() { return assignedTo; }
    public void setAssignedTo(String assignedTo) { this.assignedTo = assignedTo; }
}
