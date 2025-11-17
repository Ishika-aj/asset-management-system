package com.example.asset.controller;

import com.example.asset.dto.AssetHistoryResponse;
import com.example.asset.model.AssetHistory;
import com.example.asset.service.AssetHistoryService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/asset-history")
public class AssetHistoryController {

    private final AssetHistoryService assetHistoryService;

    public AssetHistoryController(AssetHistoryService assetHistoryService) {
        this.assetHistoryService = assetHistoryService;
    }

    // GET all history
    @GetMapping
    public List<AssetHistoryResponse> getAllHistory() {
        return assetHistoryService.getAllHistory();
    }

    // POST new history entry
    @PostMapping
    public AssetHistory addHistory(
            @RequestParam Long assetId,
            @RequestParam String action,
            @RequestParam String assignedTo
    ) {
        return assetHistoryService.addHistory(assetId, action, assignedTo);
    }
}
