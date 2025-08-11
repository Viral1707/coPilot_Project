# Functional Document for Calculator Application

## Overview
This document describes the functional requirements and features of the Calculator Application, which consists of a React frontend and a FastAPI backend microservice.

## Features
- Perform basic arithmetic operations: Addition, Subtraction, Multiplication, Division
- User inputs two numbers and selects an operation
- Result is displayed on the UI
- Handles errors (e.g., division by zero, backend connection issues)

## Frontend (React)
- UI for entering two numbers
- Dropdown to select operation
- Button to trigger calculation
- Displays result or error message
- Sends POST request to backend `/calculate` endpoint

## Backend (FastAPI)
- `/calculate` POST endpoint
  - Accepts JSON with `num1`, `num2`, and `operation`
  - Returns result or error message
- CORS enabled for frontend-backend communication

## User Flow
1. User enters two numbers
2. User selects operation (add, subtract, multiply, divide)
3. User clicks "Calculate"
4. Frontend sends request to backend
5. Backend processes and returns result
6. Frontend displays result or error

## Error Handling
- Division by zero returns error
- Invalid operation returns error
- Backend connection issues handled in frontend

## Technologies Used
- React (frontend)
- FastAPI (backend)

## Folder Structure
- `frontend/` - React app
- `microservice/` - FastAPI backend
- `docs/` - Functional documentation (this file)

---

*Author: GitHub Copilot*
*Date: August 11, 2025*
