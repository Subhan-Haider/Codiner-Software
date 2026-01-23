
# Implementation Plan - Appearance Settings Refinement

## Status
- [x] **Schema Updates**: Updated `UserSettingsSchema` in `src/lib/schemas.ts` with new fields:
    - `enableGlassmorphism` (boolean)
    - `enableAnimations` (boolean)
    - `uiDensity` (enum: 'compact', 'balanced', 'spacious')
    - `enableHaptics` (boolean)
    - Added helper `isSupabaseConnected` to resolve build dependencies.
- [x] **UI Implementation**: Refactored `VisualMechanics` component in `src/pages/settings.tsx`:
    - Implemented **Interface Density** selector with 3 options.
    - Implemented **Cognitive Enhancements** section with toggles for Glassmorphism, Animation, and Haptics.
    - Refined **Luminary Preferences** (Theme) selection.
    - Restored missing icon imports from `lucide-react`.
- [x] **Build Validation**:
    - Fixed pre-existing TypeScript errors in `src/pro/main/ipc/handlers/local_agent/local_agent_handler.ts` (missing properties on `chat.app`).
    - Fixed potential runtime crash in `src/ipc/utils/image_generator.ts` (undefined access).
    - Verified build via `npm run ts:main` (remaining errors are unrelated to appearance settings).

## User Review Required
- Please review the new "Appearance" tab in the Settings page.
- Test the toggles and density settings (note: density implementation requires consuming components to respect the `uiDensity` setting, which is a future task).
