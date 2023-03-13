package com.example.backend.DB;

import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import org.bson.codecs.configuration.CodecProvider;
import org.bson.codecs.configuration.CodecRegistry;
import org.bson.codecs.pojo.PojoCodecProvider;
import org.bson.conversions.Bson;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import static com.mongodb.MongoClientSettings.getDefaultCodecRegistry;
import static com.mongodb.client.model.Filters.eq;
import static com.mongodb.client.model.Updates.*;
import static org.bson.codecs.configuration.CodecRegistries.fromProviders;
import static org.bson.codecs.configuration.CodecRegistries.fromRegistries;


public class UserDBOperation {

    private String mongodburi="mongodb://admin:admin@ac-ljhtrmr-shard-00-00.io3pivw.mongodb.net:27017,ac-ljhtrmr-shard-00-01.io3pivw.mongodb.net:27017,ac-ljhtrmr-shard-00-02.io3pivw.mongodb.net:27017/test?replicaSet=atlas-b5a4ee-shard-0&ssl=true&authSource=admin&retryWrites=true";
    private String mongodbdatabase="parentalcontrolDB";
    private String mongodbcollection = "users";
    private MongoDatabase users = MongoClients.create(mongodburi).getDatabase(mongodbdatabase);
    private CodecProvider pojoCodecProvider = PojoCodecProvider.builder().automatic(true).build();
    private CodecRegistry pojoCodecRegistry = fromRegistries(getDefaultCodecRegistry(), fromProviders(pojoCodecProvider));
    private MongoDatabase database = users.withCodecRegistry(pojoCodecRegistry);
    private MongoCollection collection = database.getCollection(mongodbcollection, UserModel.class);

    public UserModel readUser(String userName){
        Bson queryFilter = new Document("userName",userName);
        Bson projection = new Document("userName",1).
                append("email",1).
                append("removeAdultTweets",1).
                append("removeAdultImages",1).
                append("enforceSafeSearch",1).
                append("blockedKeyWords",1).
                append("bblockedLinks",1);
        UserModel result = null;
        try {
            result = (UserModel) collection
                    .find(queryFilter)
                    .projection(projection)
                    .first();
        }catch (Exception e){
            return null;
        }
        return result;
    }
    public boolean writeUser(UserModel user){
        try {
            collection.insertOne(user);
        } catch (Exception e) {
            return false;
        }
         return true;
    }
    public boolean updateUser(UserModel user){
        try {
            collection.replaceOne(new Document("userName", user.getUserName()), user);
        } catch (Exception e) {
            return false;
        }
        return true;
    }
    public void deleteUser(String userName){
        collection.deleteOne(new Document("userName", userName));
    }
    public String getUserPassword(String userName){
        try {
            Bson queryFilter=eq("userName",userName);
            Bson projection = new Document("password",1);
            UserModel user= (UserModel) collection.find(queryFilter).projection(projection).first();
            return user.getPassword();
        }catch (Exception e){
            return null;
        }
    }
    public boolean updateUserPassword(String userName,String password){
        try {
            Bson queryFilter=eq("userName",userName);
            Bson update=set("password",password);
            collection.updateOne(queryFilter,update);
        }catch (Exception e){
            return false;
        }
        return true;
    }
    public boolean updateUserEmail(String userName,String email){
        try {
            Bson queryFilter=eq("userName",userName);
            Bson update=set("email",email);
            collection.updateOne(queryFilter,update);
        }catch (Exception e){
            return false;
        }
        return true;
    }
    public boolean updateUserRemoveAdultTweets(String userName,boolean AdultTweets){
        try {
            Bson queryFilter=eq("userName",userName);
            Bson update=set("removeAdultTweets",AdultTweets);
            collection.updateOne(queryFilter,update);
        }catch (Exception e){
            return false;
        }
        return true;
    }
    public boolean updateUserRemoveAdultImages(String userName,boolean adultImages){
        try {
            Bson queryFilter=eq("userName",userName);
            Bson update=set("removeAdultImages",adultImages);
            collection.updateOne(queryFilter,update);
        }catch (Exception e){
            return false;
        }
        return true;
    }
    public boolean updateUserEnforceSafeSearch(String userName,boolean enforceSafeSearch){
        try {
            Bson queryFilter=eq("userName",userName);
            Bson update=set("enforceSafeSearch",enforceSafeSearch);
            collection.updateOne(queryFilter,update);
        }catch (Exception e){
            return false;
        }
        return true;
    }
    public boolean addToBlockedKeyWords(String userName,String word){
        try {
            Bson queryFilter=eq("userName",userName);
            Bson update=addToSet("blockedKeyWords",word);
            collection.updateOne(queryFilter,update);
        }catch (Exception e){
            return false;
        }
        return true;
    }

    public boolean removeFromBlockedKeyWords(String userName,String word){
        try {
            Bson queryFilter=eq("userName",userName);
            Bson update=pull("blockedKeyWords",word);
            collection.updateOne(queryFilter,update);
        }catch (Exception e){
            return false;
        }
        return true;
    }
    public boolean addToBlockedLinks(String userName,String link){
        try {
            Bson queryFilter=eq("userName",userName);
            Bson update=addToSet("blockedLinks",link);
            collection.updateOne(queryFilter,update);
        }catch (Exception e){
            return false;
        }
        return true;
    }
    public boolean removeFromBlockedLinks(String userName,String link){
        try {
            Bson queryFilter=eq("userName",userName);
            Bson update=pull("blockedLinks",link);
            collection.updateOne(queryFilter,update);
        }catch (Exception e){
            return false;
        }
        return true;
    }
    public boolean isUserExist(String userName){
        try {
            Bson queryFilter=eq("userName",userName);
            UserModel user= (UserModel) collection.find(queryFilter).first();
            if(user==null){
                return false;
            }
        }catch (Exception e){
            return false;
        }
        return true;
    }


}
