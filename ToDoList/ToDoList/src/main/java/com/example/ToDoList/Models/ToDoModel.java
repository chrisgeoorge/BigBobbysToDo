package com.example.ToDoList.Models;

import java.time.LocalDate;
import java.time.LocalTime;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class ToDoModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long toDoId;
    private String title;
    private String description;
    private LocalTime time;
    private LocalDate date;
    private String priority;
    private Long userId;

    public Long getToDoId() {
        return toDoId;
    }
    public void setToDoId(Long toDoId) {
        this.toDoId = toDoId;
    }
    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public LocalTime getTime() {
        return time;
    }
    public void setTime(LocalTime time) {
        this.time = time;
    }
    public LocalDate getDate() {
        return date;
    }
    public void setDate(LocalDate date) {
        this.date = date;
    }
    public String getPriority() {
        return priority;
    }
    public void setPriority(String priority) {
        this.priority = priority;
    }
    public Long getUserId() {
        return userId;
    }
    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public ToDoModel(Long toDoId, String title, String description, LocalTime time, LocalDate date, String priority, Long userId) {
        this.toDoId = toDoId;
        this.title = title;
        this.description = description;
        this.time = time;
        this.date = date;
        this.priority = priority;
        this.userId = userId;
    }
    public ToDoModel() {}
}