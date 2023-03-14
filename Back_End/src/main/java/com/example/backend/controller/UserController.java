package com.example.backend.controller;

import com.example.backend.service.UserOperations;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/user")
public class UserController {
    private UserOperations handler=new UserOperations();
    @PostMapping("/signup")
    public ResponseEntity<Boolean> signupController(@RequestBody String receivedData){
        if (handler.signUp(receivedData)) return  new ResponseEntity<>(true, HttpStatus.ACCEPTED);
        return  new ResponseEntity<>(false, HttpStatus.FORBIDDEN);
    }
    @GetMapping("/checkUsername/{userName}")
    public ResponseEntity<Boolean> checkUsernameController( @PathVariable("userName") String userName){
        if(handler.isUserExist(userName)) return new ResponseEntity<>(true, HttpStatus.ACCEPTED);
        return  new ResponseEntity<>(false, HttpStatus.FORBIDDEN);
    }
    @PostMapping("/signin")
    public ResponseEntity<Boolean> signinController( @RequestBody String receivedData){
    	System.out.println(receivedData);
        boolean status=handler.signIn(receivedData);
        if (status)  return new ResponseEntity<>(status, HttpStatus.OK);
        return new ResponseEntity<>(status, HttpStatus.UNAUTHORIZED);
    }
}
