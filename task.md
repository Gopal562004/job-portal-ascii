# CampusConnect — Full Feature Build Task List

## Phase 1: Foundation & Authentication ✅ COMPLETE

## Phase 2: Assignment System
### Backend
- [x] Create Assignment model
- [x] Create Submission model
- [x] Create assignmentController.js
- [x] Create submissionController.js
- [x] Create assignmentRoutes.js
- [x] Create submissionRoutes.js
- [x] Update server.js with new routes

### Frontend
- [x] Teacher: AssignmentList.jsx
- [x] Teacher: CreateAssignment.jsx
- [x] Teacher: AssignmentDetail.jsx
- [x] Teacher: EvaluateSubmission.jsx
- [x] Student: AssignmentList.jsx
- [x] Student: AssignmentDetail.jsx
- [x] Update App.jsx with assignment routes

## Phase 3: Materials, Circulars, Diary, Leave
### Backend
- [x] Create Material model
- [x] Create Notice model
- [x] Create Diary model
- [x] Create Leave model
- [x] Create materialController.js
- [x] Create noticeController.js
- [x] Create diaryController.js
- [x] Create leaveController.js
- [x] Create routes for all 4 modules
- [x] Update server.js with new routes

### Frontend
- [x] FileUploader shared component
- [x] Teacher: MaterialList.jsx
- [x] Student: MaterialList.jsx
- [x] Admin: ManageNotices.jsx
- [x] Teacher: DiaryPage.jsx
- [x] Student: DiaryPage.jsx
- [x] Student: LeaveApplication.jsx
- [x] Teacher: LeaveApprovals.jsx
- [x] Update App.jsx with new routes

## Phase 4: Fee Management
### Backend
- [x] Create FeeStructure model
- [x] Create Payment model
- [x] Create feeController.js
- [x] Create feeRoutes.js
- [x] Update server.js

### Frontend
- [x] Admin: ManageFees.jsx
- [x] Student: FeeDashboard.jsx
- [x] Update App.jsx with fee routes

## Phase 5: Notifications
### Backend
- [x] Create Notification model
- [x] Create notificationService.js
- [x] Create notificationController.js
- [x] Create notificationRoutes.js
- [x] Update server.js
- [x] Integrate notifications into existing controllers

### Frontend
- [x] Create SocketContext.jsx
- [x] Create NotificationDropdown.jsx
- [x] Update Navbar.jsx with real notification data
- [x] Update App.jsx with SocketContext

## Final
- [x] Build client and verify no errors
- [x] Restart server and verify no errors
