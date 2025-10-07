package com.hrapp.hrapp.config;

import com.hrapp.hrapp.service.external.HuggingFaceClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.support.RestClientAdapter;
import org.springframework.web.service.invoker.HttpServiceProxyFactory;

@Configuration
public class HuggingFaceClientConfig {

    @Bean
    public RestClient huggingFaceRestClient(@Value("${huggingface.apiKey}") String apiKey) {
        return RestClient.builder()
                .baseUrl("https://router.huggingface.co")
                .defaultHeader(HttpHeaders.AUTHORIZATION, "Bearer " + apiKey)
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .build();
    }

    @Bean
    public HuggingFaceClient huggingFaceClient(RestClient huggingFaceRestClient) {
        var factory = HttpServiceProxyFactory
                .builderFor(RestClientAdapter.create(huggingFaceRestClient))
                .build();
        return factory.createClient(HuggingFaceClient.class);
    }
}
