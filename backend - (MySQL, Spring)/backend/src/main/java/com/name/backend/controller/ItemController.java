package com.name.backend.controller;

import com.name.backend.exception.ItemNotFoundException;
import com.name.backend.model.Item;
import com.name.backend.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class ItemController {

    @Autowired
    private ItemRepository itemRepository;

    @PostMapping("/api/todo")
    Item newItem(@RequestBody Item newItem){
        return itemRepository.save(newItem);
    }

    @GetMapping("/api/todo")
    List<Item> getAllItem(){
        return itemRepository.findAll();
    }

    @PutMapping("api/todo/{id}")
    Item updateItem(@RequestBody Item newItem, @PathVariable long id){
        return itemRepository.findById(id)
                .map(item -> {
                    item.setTitle(newItem.getTitle());
                    item.setDescription(newItem.getDescription());
                    item.setFinished(newItem.isFinished());
                    item.setDeadline(newItem.getDeadline());
                    return itemRepository.save(item);

                }).orElseThrow(() -> new ItemNotFoundException(id));
    }

    @DeleteMapping("api/todo/{id}")
    String deleteItem(@PathVariable long id){
        if(!itemRepository.existsById(id)){
            throw new ItemNotFoundException(id);
        }
        itemRepository.deleteById(id);
        return "User id " + id + " has been successfully deleted";
    }

}
