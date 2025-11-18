import { NotesResponse, FoldersResponse } from "@/pocketbase-types";

export const DEMO_FOLDERS: FoldersResponse[] = [
  {
    id: "demo_folder_1",
    collectionId: "folders_collection",
    collectionName: "folders" as any,
    name: "Work",
    metadata: "",
    created: "2025-11-01T10:00:00.000Z",
    updated: "2025-11-01T10:00:00.000Z",
    user: "demo_user",
  },
  {
    id: "demo_folder_2",
    collectionId: "folders_collection",
    collectionName: "folders" as any,
    name: "Personal",
    metadata: "",
    created: "2025-11-01T10:05:00.000Z",
    updated: "2025-11-01T10:05:00.000Z",
    user: "demo_user",
  },
  {
    id: "demo_folder_3",
    collectionId: "folders_collection",
    collectionName: "folders" as any,
    name: "Recipes",
    metadata: "",
    created: "2025-11-01T10:10:00.000Z",
    updated: "2025-11-01T10:10:00.000Z",
    user: "demo_user",
  },
  {
    id: "demo_folder_4",
    collectionId: "folders_collection",
    collectionName: "folders" as any,
    name: "Projects",
    metadata: "",
    created: "2025-11-01T10:15:00.000Z",
    updated: "2025-11-01T10:15:00.000Z",
    user: "demo_user",
  },
];

export const DEMO_NOTES: NotesResponse[] = [
  {
    id: "demo_note_1",
    collectionId: "notes_collection",
    collectionName: "notes" as any,
    title: "Welcome to Demo Mode! 👋",
    content: `# Welcome to Mononote Demo

This is a demo note to help you explore the features of Mononote without signing up.

## Features
- Create and edit notes
- Organize with folders
- Rich text editing
- And much more!

Feel free to click around and explore. All changes are temporary and won't be saved.`,
    created: "2025-11-18T10:00:00.000Z",
    updated: "2025-11-18T10:00:00.000Z",
    user: "demo_user",
    folder: "",
  },
  {
    id: "demo_note_2",
    collectionId: "notes_collection",
    collectionName: "notes" as any,
    title: "Meeting Notes - Q4 Planning",
    content: `# Q4 Planning Meeting
Date: November 15, 2025

## Attendees
- Alice Johnson
- Bob Smith
- Carol White

## Key Discussion Points
1. Review Q3 performance metrics
2. Set Q4 goals and objectives
3. Resource allocation
4. Timeline planning

## Action Items
- [ ] Alice to prepare Q3 report
- [ ] Bob to draft Q4 budget proposal
- [ ] Carol to schedule follow-up meetings

## Next Steps
Follow-up meeting scheduled for November 22nd.`,
    created: "2025-11-15T14:30:00.000Z",
    updated: "2025-11-15T16:45:00.000Z",
    user: "demo_user",
    folder: "demo_folder_1", // Work folder
  },
  {
    id: "demo_note_3",
    collectionId: "notes_collection",
    collectionName: "notes" as any,
    title: "Recipe: Chocolate Chip Cookies",
    content: `# Chocolate Chip Cookies Recipe

## Ingredients
- 2 1/4 cups all-purpose flour
- 1 tsp baking soda
- 1 tsp salt
- 1 cup butter, softened
- 3/4 cup granulated sugar
- 3/4 cup packed brown sugar
- 2 large eggs
- 2 tsp vanilla extract
- 2 cups chocolate chips

## Instructions
1. Preheat oven to 375°F (190°C)
2. Mix flour, baking soda, and salt in a bowl
3. Beat butter and both sugars until creamy
4. Add eggs and vanilla, beat well
5. Gradually stir in flour mixture
6. Stir in chocolate chips
7. Drop rounded tablespoons onto ungreased cookie sheets
8. Bake 9-11 minutes or until golden brown
9. Cool on baking sheet for 2 minutes

Yields: About 60 cookies
Prep time: 15 minutes
Cook time: 10 minutes`,
    created: "2025-11-10T09:15:00.000Z",
    updated: "2025-11-12T11:20:00.000Z",
    user: "demo_user",
    folder: "demo_folder_3", // Recipes folder
  },
  {
    id: "demo_note_4",
    collectionId: "notes_collection",
    collectionName: "notes" as any,
    title: "Project Ideas",
    content: `# Project Ideas to Explore

## Web Development
- Build a personal portfolio site
- Create a blog with Next.js
- Develop a productivity dashboard

## Mobile Apps
- Habit tracker
- Expense manager
- Weather app with beautiful UI

## Learning Goals
- Master TypeScript
- Learn more about system design
- Contribute to open source projects

## Side Projects
- Photography portfolio
- Recipe collection app
- Book reading tracker

*Note: Prioritize based on learning value and personal interest*`,
    created: "2025-11-08T19:30:00.000Z",
    updated: "2025-11-17T08:15:00.000Z",
    user: "demo_user",
    folder: "demo_folder_4", // Projects folder
  },
  {
    id: "demo_note_5",
    collectionId: "notes_collection",
    collectionName: "notes" as any,
    title: "Travel Bucket List",
    content: `# Places I Want to Visit

## Europe
- 🇮🇹 Italy - Rome, Venice, Florence
- 🇫🇷 France - Paris, Lyon, Nice
- 🇬🇷 Greece - Athens, Santorini
- 🇪🇸 Spain - Barcelona, Madrid

## Asia
- 🇯🇵 Japan - Tokyo, Kyoto, Osaka
- 🇹🇭 Thailand - Bangkok, Chiang Mai
- 🇻🇳 Vietnam - Hanoi, Ho Chi Minh City

## Americas
- 🇨🇦 Canada - Vancouver, Montreal
- 🇧🇷 Brazil - Rio de Janeiro
- 🇵🇪 Peru - Machu Picchu

## Dream Trips
- Northern Lights in Iceland
- Safari in Tanzania
- Great Barrier Reef in Australia

*Estimated budget: Need to start saving!*`,
    created: "2025-11-05T16:45:00.000Z",
    updated: "2025-11-16T20:30:00.000Z",
    user: "demo_user",
    folder: "demo_folder_2", // Personal folder
  },
  {
    id: "demo_note_6",
    collectionId: "notes_collection",
    collectionName: "notes" as any,
    title: "Quick Todo",
    content: `# Today's Tasks

## High Priority
- [ ] Finish project presentation
- [ ] Reply to important emails
- [ ] Review pull requests

## Medium Priority
- [ ] Update documentation
- [ ] Schedule team meeting
- [ ] Plan next sprint

## Low Priority
- [ ] Organize desktop files
- [ ] Clean up old branches
- [ ] Update profile picture

---
*Last updated: ${new Date().toLocaleDateString()}*`,
    created: "2025-11-18T08:00:00.000Z",
    updated: new Date().toISOString(),
    user: "demo_user",
    folder: "",
  },
];
