package com.kmanager.websocket;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.util.Map;

@Controller
public class WebSocketController {

    private final SimpMessagingTemplate template;

    public WebSocketController(SimpMessagingTemplate template) {
        this.template = template;
    }

    public void notifyRoomUpdate(String venueId, Object data) {
        template.convertAndSend("/topic/venue/" + venueId + "/rooms", data);
    }

    public void notifySessionUpdate(String venueId, Object data) {
        template.convertAndSend("/topic/venue/" + venueId + "/sessions", data);
    }

    public void notifyDashboardUpdate(String venueId, Object data) {
        template.convertAndSend("/topic/venue/" + venueId + "/dashboard", data);
    }
}
