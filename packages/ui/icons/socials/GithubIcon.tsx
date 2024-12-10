import { forwardRef } from 'react'
import type { SVGAttributes } from '../types'

export const GithubIcon = forwardRef<SVGSVGElement, SVGAttributes>((props, ref) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 25" {...props} ref={ref}>
    <path d="M14.8304 23.292C14.8304 22.793 14.8449 21.1677 14.8449 19.1416C14.8449 17.7279 14.3791 16.8056 13.8551 16.3445C17.0938 15.9665 20.5 14.6889 20.5 8.88295C20.5 7.2349 19.9396 5.88169 19.0007 4.82332C19.1535 4.43777 19.6485 2.90312 18.8551 0.824171C18.8551 0.824171 17.6324 0.415941 14.8595 2.37394C13.695 2.0413 12.4504 1.86743 11.2131 1.86743C9.97586 1.87499 8.73131 2.0413 7.56681 2.37394C4.78657 0.415941 3.56385 0.824171 3.56385 0.824171C2.77054 2.90312 3.27273 4.44533 3.41829 4.82332C2.48669 5.88169 1.919 7.22734 1.919 8.88295C1.919 14.6738 5.31788 15.9741 8.54935 16.3521C8.1345 16.73 7.75604 17.3953 7.62503 18.3705C6.79533 18.7561 4.68468 19.4213 3.38918 17.1156C3.38918 17.1156 2.6177 15.6641 1.16208 15.5583C1.16208 15.5583 -0.257151 15.5356 1.06019 16.4806C1.06019 16.4806 2.01362 16.9493 2.67592 18.6956C2.67592 18.6956 3.52746 21.6364 7.58137 20.7216C7.58864 21.9841 7.6032 22.9367 7.6032 23.292C7.6032 23.6851 7.34119 24.1462 6.63521 24.0253C8.07628 24.5242 9.61924 24.7888 11.2204 24.7888C12.8289 24.7888 14.3718 24.5167 15.8202 24.0177C15.0851 24.1689 14.8304 23.7002 14.8304 23.292ZM16.5917 23.7304C16.5553 23.7456 16.5262 23.7607 16.4898 23.7682C16.5262 23.7531 16.5625 23.7456 16.5917 23.7304ZM15.8857 24.0026C15.9002 23.995 15.9075 23.995 15.9221 23.9875C15.9075 23.995 15.893 23.995 15.8857 24.0026Z" />
  </svg>
))
