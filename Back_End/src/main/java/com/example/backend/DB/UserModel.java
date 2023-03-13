package com.example.backend.DB;

import org.bson.codecs.pojo.annotations.BsonProperty;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.index.Indexed;

import java.util.ArrayList;

public class UserModel {
    @BsonProperty("_id")
    private ObjectId id ;
    @Indexed(unique = true)
    private String userName;
    @BsonProperty("password")
    private String password;
    @BsonProperty("email")
    private String email;
    @BsonProperty("removeAdultTweets")
    private boolean removeAdultTweets;
    @BsonProperty("removeAdultImages")
    private boolean removeAdultImages;
    @BsonProperty("enforceSafeSearch")
    private boolean enforceSafeSearch;
    @BsonProperty("blockedKeyWords")
    private ArrayList<String> blockedKeyWords;
    @BsonProperty("blockedLinks")
    private ArrayList<String> blockedLinks;

    public UserModel(String userName, String password, String email) {
        this.userName = userName;
        this.password = password;
        this.email = email;
        this.removeAdultTweets = true;
        this.removeAdultImages = true;
        this.enforceSafeSearch = true;
        this.blockedKeyWords = new ArrayList<>();
        this.blockedLinks = new ArrayList<>();
    }
    public UserModel() {
    }

    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public boolean isRemoveAdultTweets() {
        return removeAdultTweets;
    }

    public void setRemoveAdultTweets(boolean removeAdultTweets) {
        this.removeAdultTweets = removeAdultTweets;
    }

    public boolean isRemoveAdultImages() {
        return removeAdultImages;
    }

    public void setRemoveAdultImages(boolean removeAdultImages) {
        this.removeAdultImages = removeAdultImages;
    }

    public boolean isEnforceSafeSearch() {
        return enforceSafeSearch;
    }

    public void setEnforceSafeSearch(boolean enforceSafeSearch) {
        this.enforceSafeSearch = enforceSafeSearch;
    }

    public ArrayList<String> getBlockedKeyWords() {
        return blockedKeyWords;
    }

    public void setBlockedKeyWords(ArrayList<String> blockedKeyWords) {
        this.blockedKeyWords = blockedKeyWords;
    }

    public ArrayList<String> getBlockedLinks() {
        return blockedLinks;
    }

    public void setBlockedLinks(ArrayList<String> blockedLinks) {
        this.blockedLinks = blockedLinks;
    }
}
