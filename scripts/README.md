# Lab Sections Seed Script

This script creates comprehensive mock data to test the LabSections functionality, including nested structures, standalone content, and various section organization patterns.

## Prerequisites

Make sure you have the following media and video IDs in your database:

- **Media ID 3**: Thumbnail for modules/volumes
- **Video ID 4**: Intro videos
- **Video IDs 2 & 3**: Lesson content videos
- **Media ID 6**: Download files

## Running the Script

```bash
# Make sure you're in the project root
cd /path/to/performix

# Run the seed script
npx tsx scripts/seed-lab-sections.ts
```

## What Gets Created

### 📚 **2 Modules** (with nested structure)

1. **Speed Development Mastery** - 6 lessons across 2 volumes
2. **Agility & Lateral Movement** - 4 lessons in 1 volume

### 📁 **4 Volumes**

- **3 Nested**: Speed Foundations, Speed Training Methods, Agility Fundamentals
- **1 Standalone**: Mental Performance Mastery (no parent module)

### 📖 **13 Lessons**

- **10 Nested**: Part of modules/volumes hierarchy
- **3 Standalone**: Independent lessons (nutrition, injury prevention, biomechanics)

### 🗂️ **6 LabSections** (different organization patterns)

1. **Getting Started** - Mixed content for beginners
2. **Quick Learning Sessions** - Lessons under 30 minutes
3. **Core Training Modules** - Traditional module display
4. **Specialized Training Volumes** - Volume-focused section
5. **Advanced Performance** - Elite-level mixed content
6. **Performance Fundamentals** - Foundation lessons

## Test Scenarios

This seed data enables testing of:

✅ **Nested Navigation**: `/lab/speed-development-mastery/speed-foundations/sprint-mechanics-fundamentals`

✅ **Direct Access Routes**:

- `/lab/lesson/performance-nutrition-essentials` (standalone lesson)
- `/lab/volume/mental-performance-mastery` (standalone volume)
- `/lab/module/speed-development-mastery` (traditional module)

✅ **LabSection Organization**:

- Content bypassing hierarchy
- Mixed content types in single sections
- Direct links to content regardless of structure

✅ **Access Control**: Mix of preview and premium content

## Data Structure Examples

### Nested Structure

```
Speed Development Mastery (Module)
├── Speed Foundations (Volume)
│   ├── Sprint Mechanics Fundamentals (Lesson) [Preview]
│   ├── Acceleration Techniques (Lesson)
│   └── Top Speed Development (Lesson)
└── Speed Training Methods (Volume)
    ├── Block Periodization for Speed (Lesson)
    ├── Plyometrics for Speed (Lesson)
    └── Recovery and Regeneration (Lesson)
```

### Standalone Content

```
Mental Performance Mastery (Standalone Volume)
├── Visualization Techniques (Lesson) [Preview]
├── Focus and Concentration Training (Lesson)
└── Competitive Mindset Development (Lesson)

Performance Nutrition Essentials (Standalone Lesson) [Preview]
Injury Prevention Strategies (Standalone Lesson)
Movement Biomechanics Analysis (Standalone Lesson)
```

### LabSection Organization

```
Getting Started (Mixed Section)
├── Speed Development Mastery (Module)
├── Sprint Mechanics Fundamentals (Lesson from nested)
├── Visualization Techniques (Lesson from standalone volume)
└── Performance Nutrition Essentials (Standalone lesson)
```

## Verification

After running the script, you can verify the data by:

1. **Admin Panel**: Check collections under "Lab" group
2. **Frontend**: Visit `/lab` to see LabSections in action
3. **Direct Routes**: Test direct access URLs
4. **Traditional Routes**: Verify nested navigation still works

## Cleanup

To remove all created data:

```javascript
// In Payload admin or API
await payload.delete({ collection: 'lab-sections', where: {} })
await payload.delete({ collection: 'lessons', where: {} })
await payload.delete({ collection: 'volumes', where: {} })
await payload.delete({ collection: 'modules', where: {} })
```
