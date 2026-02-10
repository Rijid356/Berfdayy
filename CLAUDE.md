# Birthday Interview App

## Project Overview
A React Native (Expo) mobile app for recording annual birthday interviews with children. Parents ask a set of questions each year, record a continuous video, and log text answers. Over the years, answers can be compared side-by-side to see how children grow and change.

## Tech Stack
- **Framework**: React Native with Expo SDK 52 (managed workflow)
- **Navigation**: @react-navigation/native + native-stack
- **Storage**: @react-native-async-storage/async-storage for structured data
- **Video**: expo-camera (CameraView) for recording, expo-av (Video) for playback
- **File System**: expo-file-system for video storage in app's document directory
- **Sharing/Backup**: expo-sharing for export functionality

## Architecture

### Screens
1. **HomeScreen** - List of child profiles, add new child, link to settings
2. **AddChildScreen** - Form: name, birthday (MM/DD/YYYY), emoji avatar picker
3. **ChildProfileScreen** - Shows child info, interview history, "Start Interview" button, "Compare Years" button (if 2+ interviews)
4. **InterviewScreen** - The core flow with 3 phases:
   - **Intro**: Camera preview, instructions, "Start Recording" button
   - **Recording**: Full-screen camera with question prompts overlaid at bottom. Prev/Next to cycle through questions. Stop recording when done.
   - **Answer Entry**: After recording stops, cycle through questions again to type in text answers. "Save" when done.
5. **InterviewReviewScreen** - View a saved interview: video player at top, Q&A cards grouped by category below
6. **YearCompareScreen** - For a given child, show each question with a timeline of answers across all years. Filter by category.
7. **SettingsScreen** - Export/import JSON data backup, app info

### Data Models

**Child**
```json
{
  "id": "unique_id",
  "name": "Nina",
  "birthday": "2020-02-14T00:00:00.000Z",
  "emoji": "👧",
  "createdAt": "ISO date"
}
```

**Interview**
```json
{
  "id": "unique_id",
  "childId": "child_id",
  "year": 2026,
  "age": 6,
  "date": "ISO date",
  "questions": ["q1", "q2", ...],
  "answers": { "q1": "Purple!", "q2": "Pizza" },
  "videoUri": "file:///path/to/video.mp4",
  "createdAt": "ISO date"
}
```

### Storage Utilities (src/utils/storage.js)
- `getChildren()` / `saveChild(child)` / `deleteChild(id)`
- `getInterviews()` / `getInterviewsForChild(childId)` / `saveInterview(interview)` / `deleteInterview(id)`
- `moveVideoToStorage(tempUri, filename)` - moves recorded video from cache to document directory
- `exportAllData()` / `importData(data)` - JSON backup/restore (does not include video files)
- Video directory: `${FileSystem.documentDirectory}interview-videos/`

### Questions (src/data/questions.js)
20 default questions in 6 categories:
- **basics**: How old are you today?
- **favorites**: Favorite color, food, animal, song, book, activity, movie/show
- **people**: Best friend, favorite family activity
- **dreams**: What to be when grown up, superpower, dream travel destination, want to learn
- **reflections**: Best thing this year, funniest thing, proudest moment, what makes you happy
- **fun**: One food forever, silliest thing

Each question: `{ id: 'q1', text: '...', category: 'favorites' }`

Categories: `{ favorites: { label: 'Favorites', emoji: '⭐' }, ... }`

## Design Direction
- Warm, celebratory color palette (primary: #FF6B8A pink, accent: #FFB347 gold)
- Rounded cards with soft shadows
- Child-friendly but parent-operated (not a kids' UI)
- Recording screen: camera fills screen, question prompt overlays bottom in semi-transparent dark panel
- Progress bar during recording and answer entry

## Key Implementation Notes
- Use `CameraView` from expo-camera (not the deprecated `Camera` component)
- Camera `mode="video"`, `facing="front"` by default with flip button
- `recordAsync()` returns `{ uri }` when `stopRecording()` is called
- Video playback uses `<Video>` from expo-av with `useNativeControls`
- All IDs generated with `Date.now().toString() + Math.random().toString(36).substr(2, 9)`
- Year comparison sorts interviews chronologically (oldest first)
- Long-press on cards for delete actions with confirmation alerts
- Multi-child support from the start

## Future Enhancements (not in v1)
- Cloud backup to Google Drive or Firebase
- Custom questions per child
- Photo capture alongside video
- Edit answers after saving
- Share interview summary as PDF/image
- Birthday reminder notifications
