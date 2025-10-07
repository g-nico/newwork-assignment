package com.hrapp.hrapp.service;

import com.hrapp.hrapp.service.external.ChatRequest;
import com.hrapp.hrapp.service.external.ChatResponse;
import com.hrapp.hrapp.service.external.HuggingFaceClient;
import com.hrapp.hrapp.service.external.Message;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AIEditService {

    private final HuggingFaceClient huggingFaceClient;

    public String professionalize(String raw) {
        if (raw == null || raw.isBlank()) return raw;

        String prompt = """
            Rewrite the following review text to be professional, constructive, specific, and neutral.
            Keep meaning, remove slang, avoid personal attacks, and keep it concise.
            Return only the rewritten text. If the text is gibberish and/or unintelligible, return it as-is.

            Original:
            %s
            """.formatted(raw);

        ChatRequest request = new ChatRequest(
                false,
                "openai/gpt-oss-120b:novita",
                List.of(new Message("user", prompt))
        );

        try {
            ChatResponse resp = huggingFaceClient.chat(request);
            return resp != null
                    && resp.choices() != null
                    && !resp.choices().isEmpty()
                    && resp.choices().get(0).message() != null
                    ? resp.choices().get(0).message().content()
                    : raw;
        } catch (Exception e) {
            return raw;
        }
    }
}
