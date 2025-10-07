package com.hrapp.hrapp.service.external;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.service.annotation.PostExchange;

public interface HuggingFaceClient {

    @PostExchange(
            url = "/v1/chat/completions",
            contentType = MediaType.APPLICATION_JSON_VALUE,
            accept = MediaType.APPLICATION_JSON_VALUE
    )
    ChatResponse chat(@RequestBody ChatRequest request);

}
