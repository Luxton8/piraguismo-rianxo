import '../style.css'
import { renderNavigation } from '../components/Navigation'
import { renderDisciplines } from '../components/Disciplines'
import { renderFooter } from '../components/Footer'

const app = document.querySelector<HTMLDivElement>('#app')!

app.appendChild(renderNavigation())

const main = document.createElement('main')
main.className = 'pt-24'
main.appendChild(renderDisciplines())
app.appendChild(main)

app.appendChild(renderFooter())
