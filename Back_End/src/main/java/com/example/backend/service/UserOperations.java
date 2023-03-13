package com.example.backend.service;

import com.example.backend.DB.UserDBOperation;
import com.example.backend.DB.UserModel;
import com.example.backend.Utilties.PasswordHasher;
import org.json.JSONObject;
public class UserOperations {
    private UserDBOperation userDBOperation;
    public UserOperations() {
        userDBOperation = new UserDBOperation();
    }
    public boolean isUserExist(String userName) {
        return userDBOperation.isUserExist(userName);
    }
    public boolean signIn(String receivedData) {
        JSONObject obj = new JSONObject(receivedData);
        String userName = obj.getString("userName");
        String password = obj.getString("password");
        PasswordHasher passwordHasher = new PasswordHasher();
        password = passwordHasher.hashPassword(password);
        String hashedPassword = userDBOperation.getUserPassword(userName);
        return password.equals(hashedPassword);
    }
    public boolean signUp(String receivedData) {
        JSONObject obj = new JSONObject(receivedData);
        String userName = obj.getString("userName");
        String password = obj.getString("password");
        String email = obj.getString("email");
        PasswordHasher passwordHasher = new PasswordHasher();
        password = passwordHasher.hashPassword(password);
        UserModel userModel = new UserModel(userName, password, email);
        return userDBOperation.writeUser(userModel);
    }
    public void deleteUser(String userName) {
        userDBOperation.deleteUser(userName);
    }
    public boolean updateUserPassword(String receivedData) {
        JSONObject obj = new JSONObject(receivedData);
        String userName = obj.getString("userName");
        String password = obj.getString("password");
        PasswordHasher passwordHasher = new PasswordHasher();
        password = passwordHasher.hashPassword(password);
        return userDBOperation.updateUserPassword(userName, password);
    }
    public boolean updateUserEmail(String receivedData) {
        JSONObject obj = new JSONObject(receivedData);
        String userName = obj.getString("userName");
        String email = obj.getString("email");
        return userDBOperation.updateUserEmail(userName, email);
    }
    public boolean updateUserRemoveAdultTweets(String receivedData) {
        JSONObject obj = new JSONObject(receivedData);
        String userName = obj.getString("userName");
        boolean removeAdultTweets = obj.getBoolean("removeAdultTweets");
        return userDBOperation.updateUserRemoveAdultTweets(userName, removeAdultTweets);
    }
    public boolean updateUserRemoveAdultImages(String receivedData) {
        JSONObject obj = new JSONObject(receivedData);
        String userName = obj.getString("userName");
        boolean removeAdultImages = obj.getBoolean("removeAdultImages");
        return userDBOperation.updateUserRemoveAdultImages(userName, removeAdultImages);
    }
    public boolean updateUserEnforceSafeSearch(String receivedData) {
        JSONObject obj = new JSONObject(receivedData);
        String userName = obj.getString("userName");
        boolean enforceSafeSearch = obj.getBoolean("enforceSafeSearch");
        return userDBOperation.updateUserEnforceSafeSearch(userName, enforceSafeSearch);
    }
    public boolean addToBlockedKeyWords(String receivedData) {
        JSONObject obj = new JSONObject(receivedData);
        String userName = obj.getString("userName");
        String blockedKeyWords = obj.getString("blockedKeyWords");
        return userDBOperation.addToBlockedKeyWords(userName, blockedKeyWords);
    }
    public boolean removeFromBlockedKeyWords(String receivedData) {
        JSONObject obj = new JSONObject(receivedData);
        String userName = obj.getString("userName");
        String blockedKeyWords = obj.getString("blockedKeyWords");
        return userDBOperation.removeFromBlockedKeyWords(userName, blockedKeyWords);
    }
    public boolean addToBlockedLinks(String receivedData) {
        JSONObject obj = new JSONObject(receivedData);
        String userName = obj.getString("userName");
        String blockedLinks = obj.getString("blockedLinks");
        return userDBOperation.addToBlockedLinks(userName, blockedLinks);
    }
    public boolean removeFromBlockedLinks(String receivedData) {
        JSONObject obj = new JSONObject(receivedData);
        String userName = obj.getString("userName");
        String blockedLinks = obj.getString("blockedLinks");
        return userDBOperation.removeFromBlockedLinks(userName, blockedLinks);
    }

}
