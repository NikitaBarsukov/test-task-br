package com.dev.controller;

import com.dev.model.dto.DocumentDto;
import com.dev.model.dto.PersonalDataDto;
import com.dev.service.ProxyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


@CrossOrigin
@RestController
public class FileController {

    private final ProxyService proxyService;

    @Autowired
    public FileController(ProxyService proxyService) {
        this.proxyService = proxyService;
    }

    @PostMapping("app/nbkirequest")
    public DocumentDto proxy(@RequestBody PersonalDataDto personalDataDto) throws Exception {
        return proxyService.getBase64FileFromAPIResponse(personalDataDto.getPersonaldata());
    }

    @PostMapping("/getFile")
    public ResponseEntity<String> getFile() {
        HttpHeaders headers = new HttpHeaders();
        //Base64.encodeBase64String(Files.readAllBytes(Paths.get("C:/Users/Nikita/Videos/Captures/a.mp4)))"
        headers.set("Content-type", "text/xml");
        String soap = "<?xml version=\"1.0\" ?>\n" +
                "<soapenv:Envelope xmlns:soapenv=\"http://www.w3.org/2003/05/soap-envelope\" xmlns:urn=\"urn:mFlow\">\n" +
                " <soapenv:Body>\n" +
                "  <urn:reply xmlns:urn=\"urn:mFlow\">\n" +
                "   <correlationId xmlns=\"\">C3BC97E1-2AE6-468A-B01B-E24659CC95F0</correlationId>\n" +
                "   <status xmlns=\"\">2</status>\n" +
                "   <payload xmlns=\"\">\n" +
                "    <document>SGVsbG8gV29ybGQh</document>\n" +
                "   </payload>\n" +
                "  </urn:reply>\n" +
                " </soapenv:Body>\n" +
                "</soapenv:Envelope>";
        return ResponseEntity.ok()
                .headers(headers)
                .body(soap);
    }
}