package com.example.asset.dto;

public class AssetResponse {
    private Long id;
    private String name;
    private String category;
    private String status;
    private boolean assigned;
    private String assignedTo;

    public AssetResponse(Long id, String name, String category, String status, boolean assigned, String assignedTo) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.status = status;
        this.assigned = assigned;
        this.assignedTo = assignedTo;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public boolean isAssigned() { return assigned; }
    public void setAssigned(boolean assigned) { this.assigned = assigned; }

    public String getAssignedTo() { return assignedTo; }
    public void setAssignedTo(String assignedTo) { this.assignedTo = assignedTo; }
}
