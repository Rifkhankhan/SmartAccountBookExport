import React from 'react'

const Footer = props => {
	return (
		<footer>
			<div
				class="container-fluid py-3 text-light"
				style={{ backgroundColor: '#0062d3' }}>
				<div class="row">
					<div class="col-sm-12">
						<div class="copyright-box">
							<p class="copyright py-0">
								2024, Copyright <strong>SCIT GLOBAL</strong>. All Rights
								Reserved
							</p>
							<div class="credits text-light">
								Designed by{' '}
								<a href="https://www.scitglobal.com/" class="text-light">
									SCIT GLOBAL
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</footer>
	)
}

export default Footer
