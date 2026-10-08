# TODO — Fix Fallback Question Loading

- [x] Diagnose: aiService.js never reads backend/src/data/\*.json files on AI failure
- [x] Create `backend/src/utils/fallbackQuestionLoader.js`
- [x] Update `backend/src/services/aiService.js` to use fallback loader before mock questions
- [x] Update `backend/src/config/fallback_quiz_config.json` to register Engineering Mathematics
- [ ] Restart backend and verify
