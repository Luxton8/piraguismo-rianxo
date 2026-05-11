import '../style.css'
import { renderNavigation } from '../components/Navigation'
import { renderAbout } from '../components/About'
import { renderClubDetails } from '../components/ClubDetails'
import { renderSidebarNav } from '../components/SidebarNav'
import { renderCorpoTecnico } from '../components/CorpoTecnico'
import { renderSponsors } from '../components/Sponsors'
import { renderFooter } from '../components/Footer'

const app = document.querySelector<HTMLDivElement>('#app')!

app.appendChild(renderNavigation())

const main = document.createElement('main')
main.className = 'pt-32 pb-24 bg-brand-dark'

main.innerHTML = `
  <div class="container mx-auto px-6 flex flex-col lg:flex-row gap-12 mb-24">
    <!-- Sidebar dynamically inserted here -->
    <div id="sidebar-container"></div>
    
    <!-- Content area -->
    <div class="flex-1 space-y-40">
      <div id="quensomos-content"></div>
      <div id="tecnico-content"></div>
      <div id="details-content"></div>
    </div>
  </div>
`
// Setup Sidebar
const sidebarContainer = main.querySelector('#sidebar-container')!
sidebarContainer.appendChild(renderSidebarNav('quensomos'))

// Setup Content
main.querySelector('#quensomos-content')!.appendChild(renderAbout())
main.querySelector('#tecnico-content')!.appendChild(renderCorpoTecnico())
main.querySelector('#details-content')!.appendChild(renderClubDetails())

app.appendChild(main)
app.appendChild(renderSponsors())
app.appendChild(renderFooter())
