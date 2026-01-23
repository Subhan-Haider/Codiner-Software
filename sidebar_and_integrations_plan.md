# Implementation Plan - Sidebar, Mobile & Firebase Integration

## Status
- [x] **Schema Updates**: Updated `src/lib/schemas.ts` to include `FirebaseConfigSchema` and the `firebase` field in `UserSettingsSchema`.
- [x] **New Component**: Created `src/components/FirebaseIntegration.tsx` for configuring Firebase Project ID and API Key.
- [x] **Sidebar Redesign**: Refactored `src/pages/settings.tsx`:
    - Grouped tabs into categorized sections (Core, Intelligence, System, Support).
    - Added section headers to the sidebar navigation.
    - Improved styling for a more coherent look.
- [x] **New Features**:
    - Added **Firebase** to the **Integrations** tab.
    - Added a new **Mobile** tab under the 'System' group with placeholder **Capacitor Controls** (iOS/Android targets).
- [x] **Fixes**:
    - Added missing `isSupabaseConnected` helper to resolve external build issues.
    - Updated imports in `settings.tsx`.

## User Review Required
- Please review the new grouped sidebar layout.
- Check the **Integrations** tab for the new Firebase configuration card.
- Check the **Mobile** tab for the Capacitor Controls placeholder.
