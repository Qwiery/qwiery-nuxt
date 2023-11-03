<template>
	<!-- Toolbar -->
	<div class=" ">
		<div class="relative flex w-full items-center bg-white dark:bg-[#333333]">
			<!--Schema or Explore-->
			<div class="flex ltr:mr-2 sm:block">
				<ul class="flex items-center space-x-2 rtl:space-x-reverse dark:text-[#a1a1aa]">
					<li>
						<!-- Hamburger left panel-->
						<button class="ml-2 p-1" @click="isLeftVisible = !isLeftVisible">
							<svg height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<g class="hover:stroke-sky-300" fill="transparent">
									<rect width="24" height="24" rx="5" ry="5"></rect>
									<path width="24" d="M19 10L5 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
									<path d="M19 14L5 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
									<path d="M19 6L5 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
									<path d="M19 18L5 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
								</g>
							</svg>
						</button>
					</li>
					<li>
						<button type="button" class="hover:bg-sky-300 btn btn-primary">Schema</button>
					</li>
					<li>
						<button type="button" class="hover:bg-sky-300 btn btn-primary">Explorer</button>
					</li>
				</ul>
			</div>
			<div class="flex items-center space-x-1.5 ltr:ml-auto rtl:mr-auto dark:text-[#a1a1aa] sm:flex-1 ltr:sm:ml-0 sm:rtl:mr-0 lg:space-x-2">
				<!--Explore Section-->
				<div class="border-r-2 border-primary pt-3 pr-2">
					<div class="absolute top-0 pl-1 z-20 dark:text-neutral-500 text-xs">Explore</div>
					<ul class="flex items-center mt-1 space-x-2 rtl:space-x-reverse dark:text-[#a1a1aa]">
						<li>
							<!-- Search database-->
							<button type="button" class="bg-none border-none p-1 w-5">
								<svg class="hover:fill-sky-300" fill="currentColor" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 150.817 150.817" xml:space="preserve" stroke="currentColor">
									<g>
										<g>
											<path
												d="M58.263,64.946c3.58-8.537,9.834-16.039,18.456-21.02c6.644-3.842,14.225-5.876,21.902-5.876 c6.376,0,12.568,1.461,18.207,4.031V21.677C116.829,9.706,92.563,0,62.641,0C32.71,0,8.448,9.706,8.448,21.677v21.681 C8.436,54.75,30.372,64.061,58.263,64.946z M62.629,5.416c29.77,0,48.768,9.633,48.768,16.255c0,6.634-18.998,16.258-48.768,16.258 c-29.776,0-48.774-9.624-48.774-16.258C13.855,15.049,32.853,5.416,62.629,5.416z M8.429,75.883V54.202 c0,10.973,20.396,20.015,46.841,21.449c-1.053,7.21-0.311,14.699,2.375,21.799C30.055,96.445,8.436,87.184,8.429,75.883z M95.425,125.631c-9.109,2.771-20.457,4.445-32.796,4.445c-29.931,0-54.193-9.706-54.193-21.684V86.709 c0,11.983,24.256,21.684,54.193,21.684c0.341,0,0.673-0.018,1.014-0.018C71.214,118.373,82.827,124.656,95.425,125.631z M131.296,63.11c-10.388-17.987-33.466-24.174-51.46-13.785c-17.987,10.388-24.173,33.463-13.792,51.45 c10.388,17.993,33.478,24.174,51.465,13.798C135.51,104.191,141.684,81.102,131.296,63.11z M71.449,97.657 C62.778,82.66,67.945,63.394,82.955,54.72c15.01-8.662,34.275-3.504,42.946,11.509c8.672,15.013,3.502,34.279-11.508,42.943 C99.377,117.85,80.117,112.686,71.449,97.657z M139.456,133.852l-16.203,9.353l-12.477-21.598l16.209-9.359L139.456,133.852z M137.708,149.562c-4.488,2.582-10.199,1.06-12.794-3.429l16.216-9.353C143.718,141.268,142.184,146.979,137.708,149.562z"
											></path>
										</g>
									</g>
								</svg>
							</button>
						</li>
						<li>
							<!-- Auto Search-->
							<button type="button" class="bg-none border-none p-1 w-5">
								<svg width="24px" height="24px" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
									<g>
										<path
											class="hover:stroke-sky-300"
											d="M5 4H17M5 8H13M5 12H9M5 16H8M5 20H11M16.4729 17.4525C17.046 16.8743 17.4 16.0785 17.4 15.2C17.4 13.4327 15.9673 12 14.2 12C12.4327 12 11 13.4327 11 15.2C11 16.9673 12.4327 18.4 14.2 18.4C15.0888 18.4 15.893 18.0376 16.4729 17.4525ZM16.4729 17.4525L19 20"
											stroke="currentColor"
											stroke-linecap="round"
											stroke-linejoin="round"
										></path>
									</g>
								</svg>
							</button>
						</li>
						<li>
							<!-- Clear Canvas-->
							<button type="button" class="bg-none border-none p-1 w-5">
								<svg class="hover:fill-sky-300" fill="currentColor" height="24px" width="24px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 511.999 511.999" xml:space="preserve">
									<g>
										<g>
											<g>
												<path
													d="M296.746,279.798c-4.668-13.065-8.542-23.919-11.204-31.369c-0.683-1.903-2.56-3.029-4.557-2.739 c-7.936,1.152-16.316,1.775-25.02,1.775c-8.653,0-16.998-0.606-24.9-1.758c-1.997-0.29-3.874,0.836-4.557,2.739l-11.221,31.411 c-0.836,2.33,0.435,4.932,2.825,5.572c10.923,2.918,23.697,4.702,37.854,4.702c14.208,0,27.034-1.792,37.973-4.736 C296.328,284.756,297.582,282.12,296.746,279.798z"
												></path>
											</g>
										</g>
										<g>
											<g>
												<path
													d="M307.669,310.382l-2.313-6.468c-0.768-2.15-2.987-3.243-5.154-2.628c-13.116,3.763-28.117,5.914-44.237,5.914 c-16.077,0-31.036-2.133-44.126-5.871c-2.167-0.614-4.395,0.503-5.154,2.628l-2.321,6.502c-0.768,2.15,0.239,4.574,2.364,5.41 c12.954,5.06,29.807,8.397,49.237,8.397c19.49,0,36.386-3.354,49.357-8.448C307.447,314.981,308.437,312.532,307.669,310.382z"
												></path>
											</g>
										</g>
										<g>
											<g>
												<path
													d="M255.078,0.016c-9.429,0.418-16.179,7.45-16.179,17.05v207.795c0,2.022,1.382,3.831,3.371,4.224 c4.284,0.836,8.849,1.314,13.653,1.314c4.838,0,9.429-0.486,13.747-1.331c1.98-0.401,3.362-2.21,3.362-4.232V17.962 C273.032,8.054,264.976-0.419,255.078,0.016z"
												></path>
											</g>
										</g>
										<g>
											<g>
												<path
													d="M366.498,475.143c-0.009-0.026-26.778-74.991-50.244-140.732c-0.811-2.278-3.294-3.354-5.547-2.483 c-15.317,5.922-34.142,9.387-54.741,9.387c-20.557,0-39.339-3.456-54.639-9.353c-2.253-0.87-4.736,0.23-5.547,2.5l-50.185,140.536 c-0.324,0.913-0.495,1.886-0.495,2.867c0,17.596,26.539,25.6,51.2,25.6c3.234,0,6.187-1.826,7.637-4.719l0.896-1.801l0.247,0.503 c2.219,10.718,18.697,14.592,34.108,14.549c2.773-0.008,5.333-1.493,6.869-3.797l9.975-14.959l9.967,14.95 c1.536,2.304,4.096,3.789,6.869,3.797c15.42,0.043,31.898-3.831,34.108-14.549l0.256-0.495l0.896,1.801 c1.451,2.893,4.403,4.719,7.637,4.719c24.303,0,50.389-7.799,51.132-24.875C366.907,478.463,366.796,476.022,366.498,475.143z"
												></path>
											</g>
										</g>
									</g>
								</svg>
							</button>
						</li>
						<li>
							<!-- Remove Isolated-->
							<button type="button" class="bg-none border-none p-1">
								<svg class="hover:fill-sky-300" width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<g>
										<path d="M15.59 12.26C18.4232 12.26 20.72 9.96323 20.72 7.13C20.72 4.29678 18.4232 2 15.59 2C12.7567 2 10.46 4.29678 10.46 7.13C10.46 9.96323 12.7567 12.26 15.59 12.26Z" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10"></path>
										<path
											d="M6.36002 19.44C8.06105 19.44 9.44003 18.0611 9.44003 16.36C9.44003 14.659 8.06105 13.28 6.36002 13.28C4.65898 13.28 3.28003 14.659 3.28003 16.36C3.28003 18.0611 4.65898 19.44 6.36002 19.44Z"
											stroke="currentColor"
											stroke-width="1.5"
											stroke-miterlimit="10"
										></path>
										<path
											fill="currentColor"
											d="M16.62 22C18.0338 22 19.18 20.8539 19.18 19.44C19.18 18.0262 18.0338 16.88 16.62 16.88C15.2061 16.88 14.06 18.0262 14.06 19.44C14.06 20.8539 15.2061 22 16.62 22Z"
											stroke="currentColor"
											stroke-width="1.5"
											stroke-miterlimit="10"
										></path>
									</g>
								</svg>
							</button>
						</li>
					</ul>
				</div>
				<!-- Search Input -->
				<div class="border-r-2 border-primary pt-0 pr-2">
					<form class="absolute inset-x-0 top-1/2 z-10 mx-4 hidden -translate-y-1/2 sm:relative sm:top-0 sm:mx-0 sm:block sm:translate-y-0" :class="{ '!block': search }" @submit.prevent="search = false">
						<!--Search input-->
						<div class="relative">
							<input type="text" class="peer form-input placeholder:tracking-widest ltr:pl-9 ltr:pr-9 rtl:pl-9 rtl:pr-9 sm:bg-transparent ltr:sm:pr-4 rtl:sm:pl-4" placeholder="Search..." />
							<button type="button" class="absolute inset-0 h-9 w-9 appearance-none peer-focus:text-primary ltr:right-auto rtl:left-auto">
								<svg class="mx-auto" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<circle cx="11.5" cy="11.5" r="9.5" stroke="currentColor" stroke-width="1.5" opacity="0.5" />
									<path d="M18.5 18.5L22 22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
								</svg>
							</button>
							<button type="button" class="absolute top-1/2 block -translate-y-1/2 hover:opacity-80 ltr:right-2 rtl:left-2 sm:hidden" @click="search = false">
								<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<circle opacity="0.5" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5" />
									<path d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
								</svg>
							</button>
						</div>
					</form>

					<button type="button" class="search_btn rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 dark:bg-dark/40 dark:hover:bg-dark/60 sm:hidden" @click="search = !search">
						<svg class="mx-auto h-4.5 w-4.5 dark:text-[#a1a1aa]" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<circle cx="11.5" cy="11.5" r="9.5" stroke="currentColor" stroke-width="1.5" opacity="0.5" />
							<path d="M18.5 18.5L22 22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
						</svg>
					</button>
				</div>
				<!-- View Section -->
				<div class="border-r-2 border-primary pt-3 pr-2">
					<div class="absolute top-0 pl-1.5 z-20 dark:text-neutral-500 text-xs">View</div>
					<ul class="flex items-center space-x-2 rtl:space-x-reverse dark:text-[#a1a1aa]">
						<li>
							<!-- Zoom In  -->
							<button type="button" class="bg-none border-none p-1">
								<svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<g>
										<path d="M10 17C13.866 17 17 13.866 17 10C17 6.13401 13.866 3 10 3C6.13401 3 3 6.13401 3 10C3 13.866 6.13401 17 10 17Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
										<path d="M20.9992 21L14.9492 14.95" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
										<path d="M6 10H14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
										<path d="M10 6V14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
									</g>
								</svg>
							</button>
						</li>
						<li>
							<!-- Zoom Out  -->
							<button type="button" class="bg-none border-none p-1">
								<svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<g>
										<path d="M10 17C13.866 17 17 13.866 17 10C17 6.13401 13.866 3 10 3C6.13401 3 3 6.13401 3 10C3 13.866 6.13401 17 10 17Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
										<path d="M20.9992 21L14.9492 14.95" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
										<path d="M6 10H14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
									</g>
								</svg>
							</button>
						</li>
						<li>
							<!-- Zoom Fot  -->
							<button type="button" class="bg-none border-none p-1">
								<svg width="24px" height="24px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
									<g id="SVGRepo_iconCarrier">
										<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
											<g transform="translate(-152.000000, -983.000000)" fill="currentColor">
												<path
													d="M176.972,989 L172,989 C171.448,989 171,989.448 171,990 C171,990.553 171.448,991 172,991 L174.628,991 L169.83,995.799 L171.244,997.213 L176.022,992.435 L176,995 C176,995.553 176.448,996 177,996 C177.552,996 178,995.553 178,995 L178,990 C178,989.704 177.877,989.465 177.684,989.301 C177.502,989.115 177.251,989 176.972,989 L176.972,989 Z M182,1011 C182,1012.1 181.104,1013 180,1013 L156,1013 C154.896,1013 154,1012.1 154,1011 L154,987 C154,985.896 154.896,985 156,985 L180,985 C181.104,985 182,985.896 182,987 L182,1011 L182,1011 Z M180,983 L156,983 C153.791,983 152,984.791 152,987 L152,1011 C152,1013.21 153.791,1015 156,1015 L180,1015 C182.209,1015 184,1013.21 184,1011 L184,987 C184,984.791 182.209,983 180,983 L180,983 Z M164.756,1000.79 L159.978,1005.57 L160,1003 C160,1002.45 159.552,1002 159,1002 C158.448,1002 158,1002.45 158,1003 L158,1008 C158,1008.3 158.123,1008.54 158.316,1008.7 C158.497,1008.88 158.749,1009 159.028,1009 L164,1009 C164.552,1009 165,1008.55 165,1008 C165,1007.45 164.552,1007 164,1007 L161.372,1007 L166.17,1002.2 L164.756,1000.79 L164.756,1000.79 Z M177,1002 C176.448,1002 176,1002.45 176,1003 L176.022,1005.57 L171.244,1000.79 L169.83,1002.2 L174.628,1007 L172,1007 C171.448,1007 171,1007.45 171,1008 C171,1008.55 171.448,1009 172,1009 L176.972,1009 C177.251,1009 177.503,1008.88 177.684,1008.7 C177.877,1008.54 178,1008.3 178,1008 L178,1003 C178,1002.45 177.552,1002 177,1002 L177,1002 Z M164,991 C164.552,991 165,990.553 165,990 C165,989.448 164.552,989 164,989 L159.028,989 C158.749,989 158.498,989.115 158.316,989.301 C158.123,989.465 158,989.704 158,990 L158,995 C158,995.553 158.448,996 159,996 C159.552,996 160,995.553 160,995 L159.978,992.435 L164.756,997.213 L166.17,995.799 L161.372,991 L164,991 L164,991 Z"
												></path>
											</g>
										</g>
									</g>
								</svg>
							</button>
						</li>
					</ul>
				</div>
				<!-- Layout Section -->
				<div class="border-r-2 border-primary pt-3 pr-2">
					<div class="absolute top-0 pl-1.5 z-20 dark:text-neutral-500 text-xs">Layout</div>
					<ul class="flex items-center space-x-2 dark:text-[#a1a1aa]">
						<li>
							<!-- Organic Layout-->
							<button type="button" class="bg-none border-none p-1" title="Organic Layout">
								<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 40 40">
									<g class="layer">
										<circle cx="6.34975" cy="28.14941" fill="currentColor" id="svg_1" r="3.63898" stroke="currentColor" transform="matrix(1 0 0 1 0 0)" />
										<circle cx="19.6944" cy="33.49745" fill="currentColor" id="svg_2" r="3.63898" stroke="currentColor" transform="matrix(1 0 0 1 0 0)" />
										<circle cx="31.17148" cy="14.14262" fill="currentColor" id="svg_3" r="3.63898" stroke="currentColor" />
										<circle cx="32.7674" cy="32.47878" fill="currentColor" id="svg_4" r="3.63898" stroke="currentColor" />
										<circle cx="8.72666" cy="9.93209" fill="currentColor" id="svg_6" r="3.63898" stroke="currentColor" transform="matrix(1 0 0 1 0 0)" />
										<circle cx="20.88285" cy="20.73005" fill="currentColor" id="svg_7" r="3.63898" stroke="currentColor" transform="matrix(1 0 0 1 0 0)" />
										<line fill="none" id="svg_8" stroke="currentColor" x1="20.61121" x2="20.03396" y1="22.81834" y2="31.37521" />
										<line fill="none" id="svg_9" stroke="currentColor" x1="23.36163" x2="30.96774" y1="22.81834" y2="30.83192" />
										<line fill="none" id="svg_10" stroke="currentColor" x1="10.83192" x2="20.57725" y1="11.98642" y2="20.78098" />
										<line fill="none" id="svg_13" stroke="currentColor" x1="30.28862" x2="22.88625" y1="14.4652" y2="19.21902" />
										<line fill="none" id="svg_15" stroke="currentColor" x1="9.57555" x2="18.03056" y1="29.71138" y2="33.27674" />
										<line fill="none" id="svg_16" stroke="currentColor" x1="18.47199" x2="7.40238" y1="21.59593" y2="26.96095" />
									</g>
								</svg>
							</button>
						</li>
						<li>
							<!-- Hierarchic Layout-->
							<button type="button" class="bg-none border-none p-1" title="Hierarchic Layout">
								<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 40 40">
									<g class="layer">
										<circle cx="7.19864" cy="33.44652" fill="currentColor" id="svg_1" r="3.63898" stroke="currentColor" />
										<circle cx="19.6944" cy="33.49745" fill="currentColor" id="svg_2" r="3.63898" stroke="currentColor" />
										<circle cx="33.54839" cy="33.63328" fill="currentColor" id="svg_4" r="3.63898" stroke="currentColor" />
										<circle cx="19.6944" cy="9.72835" fill="currentColor" id="svg_6" r="3.63898" stroke="currentColor" transform="matrix(1 0 0 1 0 0)" />
										<circle cx="19.6944" cy="20.73005" fill="currentColor" id="svg_7" r="3.63898" stroke="currentColor" transform="matrix(1 0 0 1 0 0)" />
										<line fill="none" id="svg_17" stroke="currentColor" x1="19.55857" x2="19.55857" y1="12.63158" y2="18.47554" />
										<line fill="none" id="svg_18" stroke="currentColor" x1="19.89813" x2="19.89813" y1="23.93888" y2="31.07357" />
										<line fill="none" id="svg_20" stroke="currentColor" x1="18.30221" x2="8.6927" y1="21.73175" y2="31.37521" />
										<line fill="none" id="svg_21" stroke="currentColor" x1="21.08659" x2="32.42784" y1="21.59593" y2="32.73345" />
									</g>
								</svg>
							</button>
						</li>
					</ul>
				</div>
			</div>
			<div>
				<button class="mr-2" @click="isRightVisible = !isRightVisible">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M13.0222 4.40984C14.1296 3.70282 14.8904 3.2193 15.477 2.95382C16.063 2.68862 16.266 2.73954 16.3704 2.79329C16.4687 2.84385 16.6217 2.96748 16.7289 3.58298C16.8368 4.20282 16.8604 5.08676 16.8919 6.38125L16.9079 7.03779L16.9107 7.15733V7.15734C16.9245 7.75902 16.9363 8.27579 17.1558 8.73565C17.3767 9.1986 17.7711 9.52725 18.2249 9.90535L18.315 9.9805L18.8095 10.3938C19.7854 11.2094 20.4473 11.7654 20.8555 12.2292C21.2548 12.683 21.2669 12.8878 21.2417 13.0207C21.2144 13.165 21.1121 13.3695 20.5559 13.6846C19.9944 14.0027 19.1596 14.3303 17.9416 14.8054L17.3232 15.0466L17.2158 15.0883L17.2158 15.0883C16.6426 15.3111 16.1645 15.4969 15.7978 15.8555C15.4314 16.2137 15.2341 16.6878 14.9971 17.2573L14.9526 17.364L14.696 17.9784C14.1907 19.1883 13.8421 20.0181 13.5102 20.5737C13.1807 21.1253 12.9746 21.2208 12.8336 21.2439C12.7051 21.2648 12.5038 21.2498 12.0622 20.8362C11.6114 20.414 11.0756 19.7346 10.2898 18.7332L9.8916 18.2257L9.81895 18.1329C9.45505 17.6676 9.13832 17.2626 8.68271 17.0282C8.22933 16.7948 7.71334 16.769 7.11533 16.7392L6.99598 16.7332L6.34288 16.6996C5.05489 16.6333 4.17649 16.5861 3.56323 16.4613C2.95581 16.3377 2.83727 16.1819 2.78899 16.0808C2.73662 15.971 2.69289 15.7624 2.97268 15.1809C3.25282 14.5986 3.75468 13.8474 4.48792 12.7547L4.86023 12.1999L4.92597 12.1021C5.27033 11.5903 5.55851 11.1621 5.65337 10.661C5.74902 10.1557 5.63303 9.65771 5.49647 9.07144L5.47044 8.95945L5.32339 8.3243C5.0335 7.0721 4.83759 6.21691 4.78789 5.58751C4.73912 4.97008 4.85001 4.77465 4.95978 4.66731C5.06855 4.56096 5.26347 4.45528 5.87493 4.52053C6.49925 4.58715 7.34449 4.80643 8.58349 5.13099L9.21179 5.29557L9.32322 5.32487C9.90236 5.47744 10.3969 5.60771 10.9044 5.52484C11.4074 5.44273 11.8424 5.16416 12.3603 4.83257L12.46 4.7688L13.0222 4.40984ZM17.0569 1.45957C16.3259 1.08338 15.568 1.2662 14.8586 1.58725C14.1615 1.90273 13.3094 2.44676 12.2677 3.11191L11.6528 3.50451C10.9803 3.93386 10.8209 4.01862 10.6627 4.04444C10.5094 4.06947 10.3443 4.04164 9.59189 3.84453L8.90166 3.66372L8.90165 3.66372C7.74011 3.35942 6.78457 3.10908 6.03409 3.029C5.25746 2.94613 4.49761 3.02133 3.9111 3.59481C3.3256 4.16731 3.23094 4.92556 3.29254 5.70561C3.35216 6.46046 3.57569 7.42589 3.8477 8.60068L4.00909 9.29777C4.18499 10.0576 4.20901 10.2263 4.17955 10.3819C4.14925 10.542 4.05958 10.7011 3.61468 11.364L3.20772 11.9705C2.5176 12.9989 1.95346 13.8395 1.62099 14.5305C1.28264 15.2338 1.08195 15.9864 1.43522 16.7267C1.79259 17.4757 2.50797 17.7774 3.26417 17.9312C4.0014 18.0812 4.99403 18.1322 6.20121 18.1943L6.91893 18.2312C7.70459 18.2716 7.86754 18.2956 7.99627 18.3619C8.12263 18.4269 8.23214 18.5407 8.71151 19.1516L9.15017 19.7107L9.15021 19.7107C9.88525 20.6476 10.4916 21.4204 11.0368 21.931C11.6012 22.4596 12.2577 22.8577 13.0753 22.7243C13.8802 22.5928 14.395 22.0175 14.7979 21.343C15.1918 20.6836 15.5807 19.7524 16.0563 18.6135L16.0563 18.6135L16.3367 17.942C16.6427 17.2095 16.7261 17.0457 16.8465 16.928C16.9665 16.8106 17.1308 16.7317 17.8682 16.444L18.4866 16.2029L18.5444 16.1803L18.5444 16.1803C19.6905 15.7334 20.6281 15.3677 21.2954 14.9897C21.9791 14.6023 22.5639 14.1009 22.7156 13.2997C22.8694 12.487 22.4931 11.8196 21.9815 11.2383C21.4878 10.6772 20.7347 10.0478 19.8217 9.28487L19.277 8.82955C18.682 8.33229 18.5713 8.21915 18.5095 8.08967C18.4462 7.9569 18.4267 7.79041 18.4075 7.00127L18.3899 6.28037C18.3604 5.06626 18.3361 4.069 18.2066 3.32558C18.0741 2.56472 17.794 1.83895 17.0569 1.45957ZM19.5303 18.4695C19.2374 18.1767 18.7625 18.1767 18.4696 18.4695C18.1767 18.7624 18.1767 19.2373 18.4696 19.5302L20.4696 21.5302C20.7625 21.8231 21.2374 21.8231 21.5303 21.5302C21.8232 21.2373 21.8232 20.7624 21.5303 20.4695L19.5303 18.4695Z"
							fill="currentColor"
						/>
					</svg>
				</button>
			</div>
		</div>
	</div>
	<splitpanes class="!h-[85vh] overflow-hidden" :push-other-panes="false">
		<pane size="20" v-if="isLeftVisible" class="">
			<!-- Left Panel-->
			<div class="border-r border-white-light dark:border-primary !h-[95vh]">
				<svg class="float-right m-1 h-[13px] w-[13px] cursor-pointer text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14" @click="isLeftVisible = !isLeftVisible">
					<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
				</svg>
				<TabGroup as="div" class="mx-2 mb-5 mt-1">
					<TabList class="mt-3 flex flex-wrap border-b border-white-light dark:border-[#191e3a]">
						<Tab as="template" v-slot="{ selected }">
							<a
								href="javascript:;"
								class="-mb-[1px] block border border-transparent p-3.5 py-2 !outline-none transition duration-300 hover:text-primary dark:hover:border-b-black"
								:class="{ '!border-white-light !border-b-white  text-primary dark:!border-[#191e3a] dark:!border-b-black': selected }"
								>Categories</a
							>
						</Tab>
						<Tab as="template" v-slot="{ selected }">
							<div
								class="-mb-[1px] block cursor-pointer border border-transparent p-3.5 py-2 !outline-none transition duration-300 hover:text-primary dark:hover:border-b-black"
								:class="{ '!border-white-light !border-b-white text-primary dark:!border-[#191e3a] dark:!border-b-black': selected }"
							>
								Relationships
							</div>
						</Tab>

						<Tab as="template" disabled>
							<a href="javascript:;" class="pointer-events-none -mb-[1px] block p-3.5 py-2 text-white-light dark:text-dark">Saved Cypher</a>
						</Tab>
					</TabList>
					<TabPanels class="flex-1 pt-5 text-sm">
						<TabPanel>
							<div class="columns-2">
								<div class="flex">
									<svg class="h-[19px] w-[19px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
										<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.9" d="M10 5.757v8.486M5.757 10h8.486M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
									</svg>
									<span class="ml-2">Add category</span>
								</div>
								<div class="float-right mr-2">
									<svg v-tippy:info class="h-[19px] w-[19px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
										<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.9" d="M8 9h2v5m-2 0h4M9.408 5.5h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
									</svg>
									<tippy target="info" trigger="mouseenter" placement="top">Popover on info</tippy>
								</div>
							</div>
							<div v-for="i in 10" class="my-3 rounded-md border border-gray-300 p-4">
								<span class="badge bg-emerald-600">Category {{ i }}</span>
								<span class="float-right">1 label</span>
							</div>
						</TabPanel>
						<TabPanel>
							<div class="flex items-start">
								<div class="h-20 w-20 flex-none ltr:mr-4 rtl:ml-4">
									<img src="/images/anonymous.png" alt="" class="m-0 h-20 w-20 rounded-full object-cover ring-2 ring-[#ebedf2] dark:ring-white-dark" />
								</div>
								<div class="flex-auto">
									<h5 class="mb-4 text-xl font-medium">Media heading</h5>
									<p class="text-white-dark">
										Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
									</p>
								</div>
							</div>
						</TabPanel>
						<TabPanel>
							<p>
								Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
								reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
							</p>
						</TabPanel>
						<TabPanel>Disabled</TabPanel>
					</TabPanels>
				</TabGroup>
			</div>
		</pane>
		<pane size="60">
			<splitpanes horizontal>
				<pane size="10" v-if="isTopVisible">
					<div>
						<svg class="float-right m-1 h-[13px] w-[13px] cursor-pointer text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14" @click="isTopVisible = !isTopVisible">
							<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
						</svg>
					</div>
				</pane>
				<pane size="70">
					<!-- Main Content-->
					<graphviz-viewer ref="viewerControl"></graphviz-viewer>
					<div v-if="showSpinner" class="absolute inset-0 flex justify-center items-center z-10">
						<spinner></spinner>
					</div>
				</pane>
				<pane size="20" v-if="isBottomVisible">
					<div>
						<svg class="float-right m-1 h-[13px] w-[13px] cursor-pointer text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14" @click="isBottomVisible = !isBottomVisible">
							<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
						</svg>
						Bottom
					</div>
				</pane>
			</splitpanes>
		</pane>
		<pane size="20" v-if="isRightVisible">
			<!--Right Panel -->
			<div class="border-l border-white-light dark:border-primary !h-[95vh]">
				<svg title="Close this panel" class="float-right m-1 h-[13px] w-[13px] cursor-pointer text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14" @click="isRightVisible = !isRightVisible">
					<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
				</svg>
				<div class="m-5 absolute">
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a mauris mollis, pellentesque metus nec, fermentum nunc. Nunc tempor maximus erat, faucibus laoreet lorem finibus non. Aenean molestie tellus lacus, elementum porttitor nunc molestie in. Sed sollicitudin lacus
						eu lectus commodo sagittis. Nulla facilisi. Vivamus vitae nulla blandit, semper lorem non, viverra elit. Nunc maximus tellus vel diam mattis imperdiet. Ut aliquam molestie magna, sit amet euismod neque eleifend at. Vestibulum ut dictum neque. Donec nisl nisi, consequat
						fermentum ultricies eget, sagittis in ex.
					</p>
				</div>
			</div>
		</pane>
	</splitpanes>
</template>
<script setup lang="ts">
	import { Pane, Splitpanes } from "splitpanes";
	import "splitpanes/dist/splitpanes.css";
	import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/vue";
	import GraphAPI from "~/utils/GraphAPI";
	import { GraphStyle } from "~/utils/enums";
	import { Toasts } from "~/composables/notifications";
	import { useAppStore } from "~/stores";

	const search = ref(true);
	let isLeftVisible = ref(true);
	let isRightVisible = ref(true);
	let isTopVisible = ref(false);
	let isBottomVisible = ref(false);
	let viewer: IGraphViewer;
	let viewerControl = ref(null);
	let showSpinner = ref(false);
	const store = useAppStore();
	definePageMeta({
		layout: "default",
	});
	useHead({
		title: "Graph Explorer",
	});
	onMounted(() => {
		viewer = <IGraphViewer>(<unknown>viewerControl.value);
	});
</script>
<style scoped></style>
