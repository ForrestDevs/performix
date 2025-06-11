# Perfomix Course Platform - Software Design Specification

## System Overview
Perfomix is a course marketplace platform built with Next.js, Payload CMS v3, and PostgreSQL, enabling content creators to publish and sell educational courses to consumers.

## Core Entities

### User
- Types: Consumer, Producer, Admin
- Fields:
  - id: UUID
  - email: String (unique)
  - password: Hashed String
  - name: String
  - role: Enum ['consumer', 'producer', 'admin']
  - avatar: Link
  - created_at: DateTime
  - updated_at: DateTime

### Course
- Fields:
  - id: UUID
  - title: String
  - slug: String (unique)
  - description: Rich Text
  - producer_id: UUID (ref: User)
  - price: Decimal
  - status: Enum ['draft', 'published', 'archived']
  - thumbnail: Media
  - category: String
  - tags: Array[String]
  - requirements: Array[String]
  - what_you_will_learn: Array[String]
  - structure_type: Enum ['flat', 'hierarchical']
  - created_at: DateTime
  - updated_at: DateTime

### Chapter
- Fields:
  - id: UUID
  - course_id: UUID (ref: Course)
  - parent_chapter_id: UUID (ref: Chapter, nullable) // For sub-chapters
  - title: String
  - description: Text
  - order: Integer
  - depth: Integer // 0 for main chapters, 1+ for subchapters
  - created_at: DateTime
  - updated_at: DateTime

### Lesson
- Fields:
  - id: UUID
  - course_id: UUID (ref: Course)
  - chapter_id: UUID (ref: Chapter, nullable) // Optional for flat structure
  - title: String
  - order: Integer
  - display_order: String // e.g., "1.2.3" for hierarchical or "1" for flat
  - content_type: Enum ['video', 'article', 'mixed']
  - content: JSON {
    primary_content: {
      type: Enum ['video', 'rich_text'],
      data: {
        // For video
        video_url: String,
        video_provider: Enum ['youtube', 'vimeo', 'custom'],
        video_thumbnail: Media,
        duration: Integer,
        
        // For rich_text
        content: Rich Text with blocks support {
          type: String,
          children: Array,
          video?: {
            url: String,
            provider: String,
            thumbnail: Media
          },
          image?: {
            url: String,
            alt: String,
            caption: String
          }
        }
      }
    },
    additional_resources: Array[{
      type: Enum ['pdf', 'link', 'file', 'embed'],
      title: String,
      description: Text,
      url: String,
      file?: Media
    }],
    attachments: Array[Media],
    downloads: Array[Media]
  }
  is_preview: Boolean
  estimated_duration: Integer (in minutes)
  created_at: DateTime
  updated_at: DateTime

### Enrollment
- Fields:
  - id: UUID
  - user_id: UUID (ref: User)
  - course_id: UUID (ref: Course)
  - status: Enum ['active', 'completed', 'refunded']
  - progress: JSON
  - purchased_at: DateTime
  - completed_at: DateTime
  - created_at: DateTime
  - updated_at: DateTime

### Progress
- Fields:
  - id: UUID
  - enrollment_id: UUID (ref: Enrollment)
  - lesson_id: UUID (ref: Lesson)
  - status: Enum ['not_started', 'in_progress', 'completed']
  - completion_date: DateTime
  - last_accessed: DateTime

### Review
- Fields:
  - id: UUID
  - course_id: UUID (ref: Course)
  - user_id: UUID (ref: User)
  - rating: Integer (1-5)
  - content: Text
  - created_at: DateTime
  - updated_at: DateTime

## Key Features

### For Producers
1. Course Creation and Management
   - Create and edit course content
   - Organize lessons into sections
   - Set pricing and preview content
   - Track student progress and engagement
   - Manage enrollments and reviews

2. Analytics Dashboard
   - Revenue tracking
   - Student engagement metrics
   - Course performance statistics
   - Review management

### For Consumers
1. Course Discovery
   - Browse courses by category
   - Search functionality
   - Filter by price, rating, duration
   - Preview available content

2. Learning Experience
   - Track progress across courses
   - Mark lessons as complete
   - Take quizzes and submit assignments
   - Leave reviews and ratings
   - Download certificates of completion

### For Admin
1. Platform Management
   - User management
   - Course approval process
   - Content moderation
   - System configuration
   - Analytics and reporting

## Technical Considerations

### Payload CMS Configuration
1. Access Control
   - Role-based access for different user types
   - Field-level permissions
   - API endpoint restrictions

2. Media Handling
   - Video storage integration (e.g., AWS S3)
   - Image optimization
   - File type restrictions

3. Authentication
   - JWT-based authentication
   - Session management
   - Password reset flow

### Database Schema
- Utilize PostgreSQL's JSON capabilities for flexible content storage
- Implement proper indexing for frequently queried fields
- Set up foreign key constraints for referential integrity
- Use materialized views for complex analytics queries

### API Structure
1. Public APIs
   - Course listing and search
   - User registration and authentication
   - Course preview endpoints

2. Protected APIs
   - Course creation and management
   - Enrollment and progress tracking
   - Analytics and reporting
   - User profile management

## Security Considerations
- Implement rate limiting
- Set up CORS policies
- Sanitize user input
- Encrypt sensitive data
- Implement audit logging
- Set up backup and recovery procedures

## Performance Optimization
- Implement caching strategy
- Use CDN for static assets
- Optimize database queries
- Implement pagination
- Use server-side rendering where appropriate