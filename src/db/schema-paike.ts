/**
 * Personal AI Knowledge Engine (PAIKE) Database Schema
 * 
 * This schema defines the tables for:
 * - Coding pattern recognition
 * - Solved problems library
 * - User preferences
 * - SEO metadata
 * - Performance metrics
 * - Sitemap entries
 */

import { sql } from 'drizzle-orm';
import { sqliteTable, text, integer, real, blob } from 'drizzle-orm/sqlite-core';

// ============================================================================
// Coding Patterns Table
// ============================================================================

export const codingPatterns = sqliteTable('coding_patterns', {
    id: integer('id').primaryKey({ autoIncrement: true }),

    // Pattern type: 'naming', 'architecture', 'library_choice', 'style', 'structure'
    patternType: text('pattern_type').notNull(),

    // JSON data containing the pattern details
    patternData: text('pattern_data', { mode: 'json' }).notNull(),

    // How many times this pattern has been observed
    frequency: integer('frequency').default(1).notNull(),

    // When this pattern was last used
    lastUsed: integer('last_used', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`).notNull(),

    // Confidence score (0.0 to 1.0)
    confidenceScore: real('confidence_score').default(0.5).notNull(),

    // When this pattern was first identified
    createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
});

// ============================================================================
// Solved Problems Table
// ============================================================================

export const solvedProblems = sqliteTable('solved_problems', {
    id: integer('id').primaryKey({ autoIncrement: true }),

    // Description of the problem
    problemDescription: text('problem_description').notNull(),

    // Vector embedding for similarity search (stored as blob)
    problemEmbedding: blob('problem_embedding', { mode: 'buffer' }),

    // The solution code
    solutionCode: text('solution_code').notNull(),

    // Explanation of the solution approach
    solutionApproach: text('solution_approach'),

    // User rating of the solution (1-10)
    successRating: integer('success_rating').default(5).notNull(),

    // Context about the project when this was solved
    projectContext: text('project_context', { mode: 'json' }),

    // Comma-separated tags for categorization
    tags: text('tags'),

    // When this problem was solved
    createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
});

// ============================================================================
// User Preferences Table
// ============================================================================

export const userPreferences = sqliteTable('user_preferences', {
    id: integer('id').primaryKey({ autoIncrement: true }),

    // Unique key for the preference
    preferenceKey: text('preference_key').notNull().unique(),

    // JSON value of the preference
    preferenceValue: text('preference_value', { mode: 'json' }).notNull(),

    // Confidence in this preference (0.0 to 1.0)
    confidence: real('confidence').default(0.5).notNull(),

    // When this preference was last updated
    updatedAt: integer('updated_at', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
});

// ============================================================================
// SEO Metadata Table
// ============================================================================

export const seoMetadata = sqliteTable('seo_metadata', {
    id: integer('id').primaryKey({ autoIncrement: true }),

    // Project identifier
    projectId: text('project_id').notNull(),

    // File path relative to project root
    filePath: text('file_path').notNull(),

    // Page title
    title: text('title'),

    // Meta description
    description: text('description'),

    // Keywords
    keywords: text('keywords'),

    // Open Graph data (JSON)
    ogData: text('og_data', { mode: 'json' }),

    // Schema.org markup (JSON)
    schemaMarkup: text('schema_markup', { mode: 'json' }),

    // When this metadata was last updated
    lastUpdated: integer('last_updated', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
});

// ============================================================================
// Performance Metrics Table
// ============================================================================

export const performanceMetrics = sqliteTable('performance_metrics', {
    id: integer('id').primaryKey({ autoIncrement: true }),

    // Project identifier
    projectId: text('project_id').notNull(),

    // Type of metric: 'bundle_size', 'load_time', 'lighthouse_score', etc.
    metricType: text('metric_type').notNull(),

    // Numeric value of the metric
    metricValue: real('metric_value').notNull(),

    // Additional metadata about the metric (JSON)
    metricMetadata: text('metric_metadata', { mode: 'json' }),

    // When this metric was recorded
    timestamp: integer('timestamp', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
});

// ============================================================================
// Sitemap Entries Table
// ============================================================================

export const sitemapEntries = sqliteTable('sitemap_entries', {
    id: integer('id').primaryKey({ autoIncrement: true }),

    // Project identifier
    projectId: text('project_id').notNull(),

    // URL path
    url: text('url').notNull(),

    // Priority (0.0 to 1.0)
    priority: real('priority').default(0.5).notNull(),

    // Change frequency: 'always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never'
    changeFrequency: text('change_frequency').default('weekly').notNull(),

    // When this page was last modified
    lastModified: integer('last_modified', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
});

// ============================================================================
// Learning Sessions Table (tracks AI learning sessions)
// ============================================================================

export const learningSessions = sqliteTable('learning_sessions', {
    id: integer('id').primaryKey({ autoIncrement: true }),

    // Type of learning: 'pattern', 'preference', 'solution'
    sessionType: text('session_type').notNull(),

    // What was learned (JSON)
    learningData: text('learning_data', { mode: 'json' }).notNull(),

    // User feedback on the learning (if any)
    userFeedback: text('user_feedback'),

    // Rating of the learning quality (1-10)
    qualityScore: integer('quality_score'),

    // When this learning session occurred
    timestamp: integer('timestamp', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
});

// ============================================================================
// Personalization Metrics Table (tracks overall personalization progress)
// ============================================================================

export const personalizationMetrics = sqliteTable('personalization_metrics', {
    id: integer('id').primaryKey({ autoIncrement: true }),

    // Overall personalization score (0-100)
    score: real('score').default(0).notNull(),

    // Number of patterns learned
    patternsLearned: integer('patterns_learned').default(0).notNull(),

    // Number of problems solved
    problemsSolved: integer('problems_solved').default(0).notNull(),

    // Number of preferences identified
    preferencesIdentified: integer('preferences_identified').default(0).notNull(),

    // Average confidence across all patterns
    averageConfidence: real('average_confidence').default(0).notNull(),

    // When this metric snapshot was taken
    timestamp: integer('timestamp', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
});

// ============================================================================
// Type Exports
// ============================================================================

export type CodingPattern = typeof codingPatterns.$inferSelect;
export type NewCodingPattern = typeof codingPatterns.$inferInsert;

export type SolvedProblem = typeof solvedProblems.$inferSelect;
export type NewSolvedProblem = typeof solvedProblems.$inferInsert;

export type UserPreference = typeof userPreferences.$inferSelect;
export type NewUserPreference = typeof userPreferences.$inferInsert;

export type SEOMetadata = typeof seoMetadata.$inferSelect;
export type NewSEOMetadata = typeof seoMetadata.$inferInsert;

export type PerformanceMetric = typeof performanceMetrics.$inferSelect;
export type NewPerformanceMetric = typeof performanceMetrics.$inferInsert;

export type SitemapEntry = typeof sitemapEntries.$inferSelect;
export type NewSitemapEntry = typeof sitemapEntries.$inferInsert;

export type LearningSession = typeof learningSessions.$inferSelect;
export type NewLearningSession = typeof learningSessions.$inferInsert;

export type PersonalizationMetric = typeof personalizationMetrics.$inferSelect;
export type NewPersonalizationMetric = typeof personalizationMetrics.$inferInsert;
