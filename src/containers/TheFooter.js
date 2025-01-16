import React from 'react'
import { CFooter } from '@coreui/react'

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div>
        <a href="kbth.gov.gh" target="_blank" rel="noopener noreferrer">
          DARA CAPITAL | DARA CAPITAL CONSULT, GHANA
        </a>
        <span className="ml-1">&copy;2022</span>
      </div>
      <div className="mfs-auto">
        <span className="mr-1">PWD | </span>
        <a href="mickynets.com" target="_blank" rel="noopener noreferrer">
          CONNECT SOLUTIONS GHANA
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)
