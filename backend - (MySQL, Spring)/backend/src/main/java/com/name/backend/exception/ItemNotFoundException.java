package com.name.backend.exception;

public class ItemNotFoundException extends RuntimeException{
    public ItemNotFoundException(Long id){
        super("Could not find user with id " + id);
    }
}
