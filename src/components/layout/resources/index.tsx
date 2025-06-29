import ResourcesSearch from './resources-search'
import ResourcesViewControls from './resources-view-controls'
import ResourcesPagination from './resources-pagination'
import ResourcesFilters from './resources-filters'

// New unified components
import EnhancedResourcesSearch from './enhanced-resources-search'
import EnhancedResourcesFilters from './enhanced-resources-filters'
import UnifiedResourcesGrid from './resources-list'
import LeadMagnetModal from './lead-magnet-modal'
import ResourcesWithLeadMagnet from './resources-with-lead-magnet'
import ResourcesClientWrapper from './resources-client-wrapper'
import { ResourceViewModeProvider, useResourceViewMode } from './view-mode-context'

export {
  // Legacy components (for backward compatibility)
  ResourcesSearch,
  ResourcesViewControls,
  ResourcesPagination,
  ResourcesFilters,

  // New unified components
  EnhancedResourcesSearch,
  EnhancedResourcesFilters,
  UnifiedResourcesGrid,
  LeadMagnetModal,
  ResourcesWithLeadMagnet,
  ResourcesClientWrapper,
  ResourceViewModeProvider,
  useResourceViewMode,
}
