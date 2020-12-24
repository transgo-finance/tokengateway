<template>
  <div id="app">
    <div class="container">
      <aside class="menu-aside">
        <div class="logo">
          <img src="./assets/logo.svg" alt="Transgo" />
        </div>

        <div class="connect-btn-wrapper">
          <button class="btn lambda" @click="openLambWallet">
            <img src="./assets/lambda.svg" alt="lambda" />

            <span v-if="lambdaAddress">{{ lambdaAddress.slice(0, 5) }}... {{ lambdaAddress.slice(-5) }}</span>
            <span v-else>{{ $t('btn.b1') }}</span>
          </button>
          <button class="btn eth" @click="openEthWallet">
            <img src="./assets/metamask.svg" alt="metamask" />
            <span v-if="ethAddress">{{ ethAddress.slice(0, 5) }}... {{ ethAddress.slice(-5) }}</span>
            <span v-else>{{ $t('btn.b2') }}</span>
          </button>
        </div>

        <div class="menu-router">
          <div
            class="menu-router-item"
            :class="[name === 'home' ? 'menu-router-item-active' : '']"
            @click="switchMenu('home')"
          >
            <div class="item-wrapper">
              <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M10.0625 0.4375C15.6199 0.4375 20.125 4.94263 20.125 10.5C20.125 16.0574 15.6199 20.5625 10.0625 20.5625C4.50513 20.5625 0 16.0574 0 10.5C0 4.94263 4.50513 0.4375 10.0625 0.4375ZM10.0625 1.875C5.29905 1.875 1.4375 5.73655 1.4375 10.5C1.4375 15.2634 5.29905 19.125 10.0625 19.125C14.8259 19.125 18.6875 15.2634 18.6875 10.5C18.6875 5.73655 14.8259 1.875 10.0625 1.875ZM15.1949 11.3872C15.5918 11.3872 15.9136 11.709 15.9136 12.106C15.9136 12.4989 15.5982 12.8183 15.2068 12.8246L15.1948 12.8247H6.68792L7.70702 13.8438C7.98769 14.1244 7.98774 14.5795 7.70702 14.8602C7.42916 15.1381 6.98034 15.1409 6.69904 14.8686L6.69057 14.8602L4.46694 12.6367C4.46299 12.6328 4.45908 12.6288 4.45522 12.6247C4.31886 12.4939 4.23395 12.3098 4.23395 12.106C4.23395 11.713 4.54935 11.3937 4.9408 11.3873L4.9527 11.3872H15.1949H15.1949ZM13.4484 6.13141L13.4569 6.13977L15.6805 8.36327C15.6845 8.36724 15.6884 8.37124 15.6923 8.37526C15.8286 8.5061 15.9135 8.69017 15.9135 8.89404C15.9135 9.28702 15.5981 9.60635 15.2067 9.6127L15.1948 9.61279H4.95259C4.55564 9.61279 4.23384 9.291 4.23384 8.89404C4.23384 8.50107 4.54924 8.18174 4.94071 8.17538L4.95261 8.17529H13.4596L12.4405 7.15624C12.1598 6.87557 12.1597 6.42046 12.4405 6.13979C12.7183 5.86191 13.1671 5.8591 13.4484 6.13141Z"
                  fill="#9795E3"
                />
              </svg>
              <span class="link">{{ $t('aside.menu.m1') }}</span>
            </div>
          </div>

          <div
            class="menu-router-item"
            :class="[name === 'swap' ? 'menu-router-item-active' : '']"
            @click="switchMenu('swap')"
          >
            <div class="item-wrapper">
              <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12.7803 1.65682C12.851 1.70269 12.851 1.79536 12.7803 1.84215L10.3746 3.45835C10.3039 3.50391 10.1871 3.45835 10.1871 3.36569V2.48801C5.39716 2.48801 1.49578 6.34319 1.49578 11.0763C1.49578 13.8242 2.82698 16.4095 5.09404 18.0257L4.20584 19.25C1.56494 17.357 8.66656e-05 14.3087 8.66656e-05 11.0763C-0.0229671 5.51354 4.55632 0.988488 10.1871 0.988488V0.110507C10.1871 0.0178445 10.3039 -0.027717 10.3746 0.0178445L12.7803 1.65682ZM20.1667 10.9231C20.1667 7.71372 18.6046 4.64406 15.9684 2.75L15.0818 3.97423C17.3206 5.59033 18.674 8.17546 18.674 10.9231C18.674 15.656 14.7792 19.5109 9.9979 19.5109V18.6333C9.9979 18.5406 9.88128 18.4951 9.811 18.5406L7.38628 20.158C7.31569 20.2035 7.31569 20.2962 7.38628 20.3433L9.78892 21.9822C9.85951 22.0277 9.97613 21.9822 9.97613 21.8895V21.0116C15.5956 21.0116 20.1667 16.4868 20.1667 10.9231ZM10.7065 5.5H9.90483C9.77862 5.5 9.69401 5.61248 9.69401 5.72497V6.73732C9.08234 6.82761 8.59828 7.07477 8.21824 7.45662C7.79659 7.88435 7.60656 8.42457 7.60656 9.07608C7.60656 9.79537 7.79659 10.3356 8.19743 10.7186C8.59828 11.1008 9.20996 11.4616 10.0741 11.8213C10.4319 11.9785 10.6646 12.1587 10.8119 12.3159C10.959 12.4728 11.0228 12.7211 11.0228 13.0352C11.0228 13.3049 10.959 13.5073 10.8119 13.6657C10.6857 13.8226 10.4749 13.9129 10.2211 13.9129C9.90483 13.9129 9.65241 13.8004 9.46238 13.5976C9.29316 13.4173 9.20996 13.1699 9.16695 12.8102C9.14615 12.6756 9.04073 12.5631 8.91452 12.5631L7.58576 12.5865C7.43875 12.5865 7.33333 12.7211 7.33333 12.8558C7.37494 13.5988 7.58576 14.1612 8.00741 14.5656C8.44986 14.993 9.01993 15.2627 9.69401 15.3305V16.275C9.69401 16.4097 9.79942 16.5 9.90483 16.5H10.7065C10.8327 16.5 10.9174 16.3875 10.9174 16.275V15.3071C11.4652 15.1946 11.8869 14.9696 12.2239 14.6322C12.6248 14.2269 12.8148 13.6879 12.8148 13.013C12.8148 12.3159 12.6248 11.7535 12.2239 11.3935C11.8231 11.0117 11.2117 10.6287 10.3684 10.2465C10.0102 10.0662 9.7567 9.90906 9.63048 9.75218C9.50399 9.595 9.44046 9.37004 9.44046 9.09948C9.44046 8.83012 9.50399 8.62735 9.63048 8.44677C9.7567 8.2665 9.94672 8.19961 10.1991 8.19961C10.4519 8.19961 10.6627 8.31209 10.8108 8.51486C10.937 8.67174 11.0008 8.9201 11.0216 9.21196C11.0424 9.34664 11.1479 9.45912 11.2741 9.43693L12.5809 9.41473C12.7279 9.41473 12.8333 9.28005 12.8333 9.14507C12.7917 8.53826 12.6225 8.02023 12.2855 7.61499C11.9484 7.18725 11.4838 6.91789 10.9151 6.78291V5.72617C10.9174 5.61248 10.8327 5.5 10.7065 5.5Z"
                  fill="#9795E3"
                />
              </svg>
              <span class="link">{{ $t('aside.menu.m2') }}</span>
            </div>
          </div>

          <div
            class="menu-router-item"
            :class="[name.includes('pool') ? 'menu-router-item-active' : '']"
            @click="switchMenu('pool')"
          >
            <div class="item-wrapper">
              <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M6.73828 13.4711C6.73828 15.3331 5.22891 16.8402 3.36914 16.8402C1.50938 16.8402 0 15.3308 0 13.4711C0 11.6113 1.50938 10.1019 3.36914 10.1019C5.22891 10.1019 6.73828 11.6113 6.73828 13.4711ZM3.36914 15.223C4.33721 15.223 5.12109 14.4391 5.12109 13.4711C5.12109 12.503 4.33721 11.7191 3.36914 11.7191C2.40107 11.7191 1.61719 12.503 1.61719 13.4711C1.61719 14.4391 2.40107 15.223 3.36914 15.223ZM9.3707 7.21796C7.51094 7.21796 6.00156 5.70858 6.00156 3.84882C6.00156 1.98905 7.51094 0.479675 9.3707 0.479675C11.2305 0.479675 12.7398 1.98905 12.7398 3.84882C12.7398 5.70858 11.2305 7.21796 9.3707 7.21796ZM9.3707 2.09686C8.40264 2.09686 7.61875 2.88075 7.61875 3.84882C7.61875 4.81688 8.40264 5.60077 9.3707 5.60077C10.3388 5.60077 11.1227 4.81688 11.1227 3.84882C11.1227 2.88075 10.3388 2.09686 9.3707 2.09686ZM15.4352 10.1019C17.2972 10.1019 18.8043 11.6113 18.8043 13.4711C18.8043 15.3308 17.2949 16.8402 15.4352 16.8402C13.5754 16.8402 12.066 15.3308 12.066 13.4711C12.066 11.6113 13.5754 10.1019 15.4352 10.1019ZM15.4352 15.223C16.4032 15.223 17.1871 14.4391 17.1871 13.4711C17.1871 12.503 16.4032 11.7191 15.4352 11.7191C14.4671 11.7191 13.6832 12.503 13.6832 13.4711C13.6832 14.4391 14.4671 15.223 15.4352 15.223ZM15.7047 9.58085C15.4441 7.78622 14.4379 6.23417 13.0116 5.24364C13.1778 4.81014 13.2699 4.33846 13.2699 3.84657C13.2699 3.72753 13.2654 3.60848 13.2542 3.49169C15.6036 4.79667 17.232 7.24716 17.378 10.0885C16.8794 9.80097 16.3111 9.62128 15.7047 9.58085ZM12.5332 16.0766C12.9263 16.5123 13.4137 16.8582 13.964 17.0828C12.6635 17.9947 11.08 18.5293 9.3707 18.5293C7.67266 18.5293 6.09815 18.0015 4.7999 17.1008C5.35693 16.8807 5.85108 16.537 6.24863 16.1013C7.17402 16.6179 8.23643 16.9121 9.3707 16.9121C10.5207 16.9121 11.6011 16.6089 12.5332 16.0766ZM5.72979 5.24589C4.30127 6.23417 3.29502 7.79071 3.03672 9.58759C2.42803 9.63925 1.85752 9.83016 1.36113 10.1289C1.4959 7.26962 3.12656 4.80341 5.48721 3.49393C5.47822 3.61073 5.47148 3.72977 5.47148 3.84882C5.47148 4.34071 5.56357 4.81239 5.72979 5.24589Z"
                  fill="#918FDA"
                />
              </svg>
              <span class="link">{{ $t('aside.menu.m3') }}</span>
            </div>
          </div>

          <div
            class="menu-router-item"
            :class="[name.includes('history') ? 'menu-router-item-active' : '']"
            @click="switchMenu('history')"
          >
            <div class="item-wrapper">
              <svg
                t="1608013134558"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="1764"
                width="20"
                height="20"
              >
                <path
                  d="M117.604488 63.823608l0 896.352785 619.603717 0 0-168.06781 169.186284 0L906.394489 63.823608 117.604488 63.823608zM812.277948 690.709171c0 14.852266-12.040221 26.89044-26.89044 26.89044L238.612493 717.599611c-14.851243 0-26.89044-12.038174-26.89044-26.89044l0-21.288862c0-14.851243 12.040221-26.89044 26.89044-26.89044l546.775015 0c14.851243 0 26.89044 12.040221 26.89044 26.89044L812.277948 690.709171zM812.277948 559.617507c0 14.851243-12.040221 26.89044-26.89044 26.89044L238.612493 586.507948c-14.851243 0-26.89044-12.040221-26.89044-26.89044l0-20.727067c0-14.852266 12.040221-26.89044 26.89044-26.89044l546.775015 0c14.851243 0 26.89044 12.038174 26.89044 26.89044L812.277948 559.617507zM812.277948 429.085592c0 14.852266-12.040221 26.89044-26.89044 26.89044L238.612493 455.976032c-14.851243 0-26.89044-12.038174-26.89044-26.89044l0-20.727067c0-14.851243 12.040221-26.89044 26.89044-26.89044l546.775015 0c14.851243 0 26.89044 12.040221 26.89044 26.89044L812.277948 429.085592zM812.277948 279.506878c0 14.852266-12.040221 26.89044-26.89044 26.89044L238.612493 306.397319c-14.851243 0-26.89044-12.038174-26.89044-26.89044l0-20.727067c0-14.852266 12.040221-26.89044 26.89044-26.89044l546.775015 0c14.851243 0 26.89044 12.038174 26.89044 26.89044L812.277948 279.506878zM793.71108 960.176392 906.395512 829.454142 793.71108 829.454142 793.71108 960.176392z"
                  p-id="1765"
                  fill="#9795E3"
                ></path>
              </svg>
              <span class="link">{{ $t('aside.menu.m4') }}</span>
            </div>
          </div>

          <div class="menu-router-item">
            <div class="item-wrapper">
              <svg
                t="1608024654306"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="5171"
                width="21"
                height="21"
              >
                <path
                  d="M512 85.333333c235.637333 0 426.666667 191.029333 426.666667 426.666667S747.637333 938.666667 512 938.666667 85.333333 747.637333 85.333333 512 276.362667 85.333333 512 85.333333z m0 586.666667a32 32 0 1 0 0 64 32 32 0 0 0 0-64z m-2.517333-373.333333c-48.416 0-92.746667 24.16-118.613334 63.413333a137.088 137.088 0 0 0-15.978666 33.237333 32 32 0 0 0 60.906666 19.690667c2.016-6.24 4.885333-12.202667 8.522667-17.717333C458.4 375.914667 482.709333 362.666667 509.482667 362.666667 552.277333 362.666667 586.666667 396.266667 586.666667 437.333333s-34.4 74.666667-77.194667 74.666667a32 32 0 0 0-32 32v64a32 32 0 0 0 64 0v-35.584C603.946667 558.197333 650.666667 503.232 650.666667 437.333333c0-76.757333-63.381333-138.666667-141.194667-138.666666z"
                  p-id="5172"
                  fill="#9795E3"
                ></path>
              </svg>

              <a href="https://transgofinance.gitbook.io/transgofinance/" target="_blank" class="link">
                {{ $t('aside.menu.m5') }}
              </a>
            </div>
          </div>

          <div class="menu-router-item">
            <div class="item-wrapper">
              <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M15.1554 8.41238C15.1554 8.30642 15.1535 8.20142 15.1487 8.09738C15.6021 7.75947 15.9954 7.33661 16.3066 6.85265C15.8904 7.03974 15.4437 7.16479 14.974 7.21729C15.4532 6.92233 15.8207 6.45079 15.9945 5.88474C15.5458 6.15679 15.0495 6.35152 14.5216 6.4527C14.0987 5.97161 13.4955 5.6652 12.8282 5.65374C11.5472 5.63274 10.5087 6.7152 10.5087 8.07161C10.5087 8.26442 10.5287 8.45151 10.5688 8.63192C8.63968 8.50783 6.93009 7.50365 5.78655 5.98974C5.58705 6.35247 5.4725 6.77629 5.4725 7.23065C5.4725 8.08974 5.882 8.85338 6.50436 9.30392C6.1235 9.28674 5.7665 9.17124 5.45341 8.98224C5.45341 8.99274 5.45341 9.00324 5.45341 9.01374C5.45341 10.2146 6.25332 11.2207 7.31477 11.4555C7.12005 11.5108 6.91482 11.5395 6.70386 11.5385C6.554 11.5376 6.40891 11.5213 6.26764 11.4908C6.56259 12.4749 7.41977 13.1937 8.43446 13.2176C7.64027 13.8762 6.63991 14.2695 5.55364 14.2666C5.36655 14.2666 5.18136 14.2542 5 14.2313C6.02709 14.9357 7.24605 15.3462 8.55664 15.3462C12.8225 15.3471 15.1554 11.634 15.1554 8.41238Z"
                  fill="#9795E3"
                />
                <path
                  d="M21 10.5C21 4.70114 16.2989 0 10.5 0C4.70114 0 0 4.70114 0 10.5C0 16.2989 4.70114 21 10.5 21C16.2989 21 21 16.2989 21 10.5ZM0.954545 10.5C0.954545 5.22805 5.22805 0.954545 10.5 0.954545C15.772 0.954545 20.0455 5.22805 20.0455 10.5C20.0455 15.772 15.772 20.0455 10.5 20.0455C5.22805 20.0455 0.954545 15.772 0.954545 10.5Z"
                  fill="#9795E3"
                />
              </svg>

              <a target="_blank" class="link" href="https://twitter.com/transgoofficial">{{ $t('aside.menu.m6') }}</a>
            </div>
          </div>

          <div class="menu-router-item">
            <div class="item-wrapper">
              <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M14.2072 11.3714C14.2072 9.60422 12.3717 8.17169 10.1036 8.17169C7.83754 8.17169 6 9.60422 6 11.3714C6 13.1279 7.81624 14.552 10.0652 14.569C11.0437 16.2147 11.9411 15.8992 11.9411 15.8992C11.9411 15.8992 11.2419 15.4345 11.1694 14.4603C12.9196 14.0936 14.2072 12.8508 14.2072 11.3714ZM8.73929 10.8726C8.47496 10.8726 8.25967 10.6573 8.25967 10.393C8.25967 10.1286 8.47498 9.91334 8.73929 9.91334C9.00363 9.91334 9.21892 10.1286 9.21892 10.393C9.21892 10.6573 9.00363 10.8726 8.73929 10.8726ZM11.3677 10.8726C11.1012 10.8726 10.8881 10.6573 10.8881 10.393C10.8881 10.1286 11.1012 9.91334 11.3677 9.91334C11.632 9.91334 11.8452 10.1286 11.8452 10.393C11.8452 10.6573 11.6321 10.8726 11.3677 10.8726Z"
                  fill="#9795E3"
                />
                <path
                  d="M15.7868 7.61317C15.0982 6.10177 13.233 5.01672 11.0373 5.01672C8.25536 5.01672 6 6.75835 6 8.90499C6 10.7447 7.65637 12.2859 9.87975 12.6888C9.8371 13.9614 8.92475 14.569 8.92475 14.569C8.92475 14.569 10.0759 14.9761 11.3102 12.7933C11.3102 12.7933 11.3038 12.7911 11.2931 12.789C11.5255 12.7783 11.7557 12.757 11.9795 12.725C11.6811 12.2518 11.5127 11.721 11.5127 11.1582C11.5126 9.26953 13.4014 7.72615 15.7868 7.61317ZM9.5344 8.25483C9.18266 8.25483 8.89914 7.97131 8.89914 7.62173C8.89914 7.26999 9.18266 6.98647 9.5344 6.98647C9.88401 6.98647 10.1675 7.26999 10.1675 7.62173C10.1675 7.97129 9.88403 8.25483 9.5344 8.25483ZM12.0967 7.62171C12.0967 7.26997 12.3803 6.98645 12.732 6.98645C13.0816 6.98645 13.3651 7.26997 13.3651 7.62171C13.3651 7.97131 13.0816 8.25481 12.732 8.25481C12.3803 8.25483 12.0967 7.97129 12.0967 7.62171Z"
                  fill="#9795E3"
                />
                <path
                  d="M10.2357 1.31351C11.4764 1.31351 12.6793 1.55625 13.8112 2.035C14.905 2.49763 15.8875 3.16015 16.7315 4.00416C17.5755 4.84816 18.2381 5.83072 18.7007 6.9245C19.1794 8.05637 19.4222 9.25933 19.4222 10.4999C19.4222 11.7406 19.1794 12.9435 18.7007 14.0754C18.2381 15.1692 17.5755 16.1517 16.7315 16.9957C15.8875 17.8397 14.905 18.5023 13.8112 18.9649C12.6793 19.4436 11.4764 19.6864 10.2357 19.6864C8.99513 19.6864 7.79216 19.4436 6.6603 18.9649C5.5665 18.5023 4.58396 17.8397 3.73996 16.9957C2.89595 16.1517 2.23343 15.1692 1.7708 14.0754C1.29205 12.9435 1.04931 11.7406 1.04931 10.4999C1.04931 9.25931 1.29205 8.05637 1.7708 6.9245C2.23343 5.8307 2.89595 4.84816 3.73996 4.00416C4.58396 3.16015 5.56652 2.49763 6.6603 2.035C7.79216 1.55625 8.99511 1.31351 10.2357 1.31351ZM10.2357 0.264221C4.58271 0.264221 0 4.84693 0 10.5C0 16.153 4.58271 20.7357 10.2357 20.7357C15.8888 20.7357 20.4715 16.153 20.4715 10.5C20.4715 4.84693 15.8888 0.264221 10.2357 0.264221Z"
                  fill="#9795E3"
                />
              </svg>

              <a target="_blank" class="link" href="https://medium.com/transgo">Medium</a>
            </div>
          </div>
        </div>

        <div class="lang-wrapper">
          <button class="btn lang" @click="changeLang">
            <template v-if="lang == 'zh'">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="mr5"
              >
                <path
                  d="M0.117191 13.2337H15.8575V2.76627H0.117191V13.2337ZM15.8965 13.2728V13.2337V13.2728ZM0.0520935 13.2988V2.70117H15.9226V13.2988H0.0520935Z"
                  fill="#353636"
                />
                <path d="M0.091156 2.7272H15.8965V13.2598H0.091156V2.7272Z" fill="#D64B24" />
                <path
                  d="M2.73403 3.92495L3.07253 4.95347H4.15312L3.28083 5.5784L3.60632 6.60692L2.73403 5.96899L1.86174 6.60692L2.20024 5.5784L1.32794 4.95347H2.40854L2.73403 3.92495ZM5.54619 3.37814L5.53317 3.74269L5.85865 3.87288L5.50713 3.96402L5.49411 4.31553L5.29882 4.01609L4.96031 4.0942L5.18164 3.8208L4.99937 3.52136L5.32486 3.66457L5.54619 3.37814ZM6.75697 4.53685L6.60076 4.84934L6.84812 5.0967L6.4966 5.04462L6.34037 5.35708L6.28829 5.00556L5.93677 4.95348L6.24924 4.79726L6.19716 4.44574L6.44453 4.6931L6.75697 4.53685ZM6.39244 5.96899L6.50961 6.30748H6.86113L6.57471 6.51579L6.67885 6.85429L6.39244 6.64599L6.10601 6.85429L6.22319 6.51579L5.93676 6.30748H6.28828L6.39244 5.96899ZM5.54618 7.0626L5.52015 7.41412L5.85864 7.54431L5.50713 7.63544L5.48109 7.98696L5.29882 7.68752L4.9473 7.77865L5.18164 7.50526L4.98635 7.20581L5.32486 7.336L5.54618 7.0626Z"
                  fill="#FBDC00"
                />
              </svg>

              <span>简体中文</span>
            </template>

            <template v-else>
              <svg
                t="1608519000615"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="2925"
                width="18"
                height="18"
                class="mr5"
              >
                <path d="M63.3 204H959v615.8H63.3z" fill="#FFFFFF" p-id="2926"></path>
                <path
                  d="M63.3 204H959v40.9H63.3V204z m0 82.3H959v40.9H63.3v-40.9z m0 81.7H959v40.9H63.3V368z m0 82.3H959v40.9H63.3v-40.9z m0 82.3H959v40.9H63.3v-40.9z m0 81.8H959v40.9H63.3v-40.9z m0 82.3H959v40.9H63.3v-40.9z m0 82.3H959v40.9H63.3V779z m0 0"
                  fill="#D02F44"
                  p-id="2927"
                ></path>
                <path d="M63.3 204h391.9v287.2H63.3z" fill="#46467F" p-id="2928"></path>
                <path
                  d="M119.8 261.7l-14 10.6 5-17.4-14-11.2h17.4l5.6-17.4 5.6 17.4h17.4l-14 11.2 5 17.4-14-10.6z m91.9 0l-14 10.6 5-17.4-14-11.2h17.4l5.6-17.4 5.6 17.4h17.4l-14 11.2 5 17.4-14-10.6z m92.3 0l-14 10.6 5-17.4-14-11.2h17.4l5.6-17.4 5.6 17.4H327l-14 11.2 5 17.4-14-10.6z m91.8 1.6l-14 10.6 5-17.9-14-11.2 17.4-0.6 5.6-17.9 5.6 17.9 17.4 0.6-14 11.2 5 17.9-14-10.6z m-240.1 46.5l-14 10.6 5-17.4-14-11.2h17.4l5.6-17.4 5.6 17.4h17.4l-14 11.2 5 17.4-14-10.6z m103.5 0l-14 10.6 5-17.4-14-11.2h17.4l5.6-17.4 5.6 17.4h17.4l-14 11.2 5 17.4-14-10.6z m103 0l-14 10.6 5-17.4-14-11.2h17.4l5.6-17.4 5.6 17.4h17.4l-14 11.2 5 17.4-14-10.6z m-242.4 48.7l-14 10.6 5-17.4-14-11.2h17.4l5.6-17.4 5.6 17.4h17.4l-14 11.2 5 17.4-14-10.6z m91.9 0l-14 10.1 5-17.4-14-11.2h17.4l5.6-17.4 5.6 17.4h17.4l-14 11.2 5 17.4-14-10.1z m92.3 0l-14 10.6 5-17.4-14-11.2h17.4l5.6-17.4 5.6 17.4H327l-14 11.2 5 17.4-14-10.6z m91.8 1.1l-14 10.6 5-17.9-14-11.2 17.4-0.6 5.6-17.9 5.6 17.9 17.4 0.6-14 11.2 5 17.9-14-10.6z m-276 95.2l-14 10.6 5-17.4-14-11.2h17.4l5.6-17.4 5.6 17.4h17.4l-14 11.2 5 17.4-14-10.6z m91.9 0l-14 10.6 5-17.4-14-11.2h17.4l5.6-17.4 5.6 17.4h17.4l-14 11.2 5 17.4-14-10.6z m92.3 0l-14 10.6 5-17.4-14-11.2h17.4l5.6-17.4 5.6 17.4H327L313 448l5 17.4-14-10.6z m91.8 1.7l-14 10.6 5-17.9-14-11.2 17.4-0.6 5.6-17.9 5.6 17.9 17.4 0.6-14 11.2 5 17.9-14-10.6z m-240.1-49.8l-14 10.6 5-17.4-14-11.2h17.4l5.6-17.4 5.6 17.4h17.4l-14 11.2 5 17.4-14-10.6z m103.5 0l-14 10.6 5-17.4-14-11.2h17.4l5.6-17.4 5.6 17.4h17.4l-14 11.2 5 17.4-14-10.6z m103 0l-14 10.6 5-17.4-14-11.2h17.4l5.6-17.4 5.6 17.4h17.4l-14 11.2 5 17.4-14-10.6z m0 0"
                  fill="#FFFFFF"
                  p-id="2929"
                ></path>
              </svg>
              <span>English</span>
            </template>
            <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M8.667 0.332977V3.66698H0V4.99998H14L8.667 0.332977ZM5.333 11.667V8.33298H14V6.99998H0L5.333 11.667Z"
                fill="#2C2C2C"
              />
            </svg>
          </button>
        </div>
      </aside>
      <main class="main-container">
        <div class="bg1"></div>
        <div class="bg2"></div>
        <router-view />
      </main>
    </div>

    <div class="modal-wrapper">
      <Modal class-name="my-modal" v-model="openEth" :title="$t('dialog.title.t1')" :footer-hide="true">
        <div class="modal-content">
          <div class="img-wrapper">
            <img src="./assets/blueblacklogo.svg" alt="transgo" />
          </div>

          <div class="connect-wrapper" @click="connect('eth')">
            <div class="logo-wrapper">
              <img src="./assets/metamask.svg" alt="metamask" />
            </div>
            <span class="name-wrapper">{{ $t('dialog.content.c1') }}</span>
          </div>

          <p class="notice">{{ $t('dialog.content.c2') }}</p>

          <div class="link-wrapper">
            <a target="_blank" href="https://download.lambdastorage.com/metamask/8.1.8/metamask-chrome-8.1.8.zip">
              {{ $t('dialog.content.c3') }}
            </a>
            <a
              target="_blank"
              href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=zh-CN"
            >
              {{ $t('dialog.content.c4') }}
            </a>
            <span style="font-size: 12px; color: red">{{ $t('dialog.content.c5') }}</span>
          </div>
        </div>
      </Modal>

      <Modal class-name="my-modal" v-model="openLamb" :title="$t('dialog.title.t1')" :footer-hide="true">
        <div class="modal-content">
          <div class="img-wrapper">
            <img src="./assets/blueblacklogo.svg" alt="transgo" />
          </div>

          <div class="connect-wrapper" @click="connect('lamb')">
            <div class="logo-wrapper">
              <img src="./assets/lambda.svg" alt="lambda" />
            </div>
            <span class="name-wrapper">{{ $t('dialog.content.c6') }}</span>
          </div>

          <p class="notice">{{ $t('dialog.content.c7') }}</p>

          <div class="link-wrapper">
            <a target="_blank" href="https://download.lambdastorage.com/chrome-extension/0.6.7/LAMB-Wallet-Chrome.zip">
              {{ $t('dialog.content.c3') }}
            </a>
            <span style="font-size: 12px; color: red">{{ $t('dialog.content.c5') }}</span>
          </div>
        </div>
      </Modal>
    </div>
  </div>
</template>

<script>
import config from './config/index.js';
import jscookie from 'js-cookie';
const tlambda = require('./constants/abis/erc20Tlamb.json');
import Web3 from 'web3';
import { mapState } from 'vuex';
import { ethers } from 'ethers';
export default {
  data() {
    return {
      // ethAddress: null,
      openEth: false,
      openLamb: false,
      name: 'Swap',
      lang: 'en',
    };
  },
  computed: {
    ...mapState(['ethAddress', 'lambdaAddress', 'contract', 'ethChainID', 'chainID','OpenethWallet','OpenlambWallet']),
  },
  methods: {
    openEthWallet() {
      if (!this.ethAddress) {
        this.openEth = true;
      }
    },
    openLambWallet() {
      if (!this.lambdaAddress) {
        this.openLamb = true;
      }
    },

    // 切换路由
    switchMenu(name) {
      this.name = name;
      switch (this.name) {
        case 'home':
          this.$router.push('/');
          break;
        case 'swap':
          this.$router.push('/swap');
          break;

        case 'pool':
          this.$router.push('/pool');
          break;

        case 'history':
          this.$router.push(`/history/eth/${this.lambdaAddress}/${this.ethAddress}`);
          break;

        default:
          this.$router.push('/');
          break;
      }
    },
    connect(val) {
      val === 'eth' ? this.getEthAuth() : this.getLambAuth();
    },

    // 获取metamask授权
    async getEthAuth() {
      try {
        // 请求用户授权
        let res = await window.ethereum.enable();
        this.$store.commit('changeEthAddress', res[0]);
        await this.initEth();
        this.openEth = false;
      } catch (error) {
        console.log(error);
        // 用户不授权时
        console.error('User denied account access');
        this.openEth = false;
        this.$Notice.warning({
          title: this.$t('notice.n'),
          desc: this.$t(this.$t('notice.n1')),
        });
      }
    },

    // 获取以太坊chainID
    async getEthChainID() {
      try {
        const res = await web3.eth.getChainId();
        this.$store.commit('changeEthChainID', res);
      } catch (error) {
        console.log(error);
        this.$Notice.warning({
          title: this.$t('notice.n'),
          desc: this.$t('notice.n2'),
        });
      }
    },

    // 获取Lamb授权
    async getLambAuth() {
      try {
        await window.keplrlamb.enable();
        await this.initLamb();
        this.openLamb = false;
      } catch (error) {
        console.log(error);
        // 用户不授权时
        // console.log('User denied account access');
        let errMessage = error.toString();
        if (errMessage.includes(`key doesn't exist`)) {
          this.$Notice.warning({
            title: this.$t('notice.n'),
            desc: this.$t('notice.n3'),
          });
          return false;
        } else {
          this.$Notice.warning({
            title: this.$t('notice.n'),
            desc: this.$t('notice.n4'),
          });
        }
        this.openLamb = false;
      }
    },

    // 检查是否连接lambda钱包
    async isConnectLambda(chainId) {
      try {
        const offlineSigner = window.getOfflineSigner(chainId);
        const accounts = await offlineSigner.getAccounts();
        // 已连接账户，设置当前账户
        if (accounts) {
          this.$store.commit('changeLambdaAddress', accounts[0] && accounts[0].address);
          return true;
        }
      } catch (error) {
        console.log(error);
        return false;
      }
    },

    // 初始化Lambda钱包
    async initLamb() {
      if (!window.keplrlamb) {
        this.$Notice.warning({
          title: this.$t('notice.n'),
          desc: this.$t('notice.n5'),
        });
        return false;
      }
      try {
        const chainId = await window.keplrlamb.getChainId();
        this.$store.commit('changeID', chainId);
        let isConnect = await this.isConnectLambda(chainId);

        if (!isConnect) {
          this.$Notice.warning({
            title: this.$t('notice.n'),
            desc: this.$t('notice.n4'),
          });
          return false;
        } else {
          await this.getLambBalance();
          await this.getLambdaChainID();
        }
      } catch (error) {
        console.log(error);
        this.$Notice.warning({
          title: this.$t('notice.n'),
          desc: this.$t('notice.n6'),
        });
      }
    },

    // 获取当前连接的eth地址
    async getCurrentAccount() {
      try {
        const res = await web3.eth.getAccounts();
        if (res.length < 1) {
          this.$Notice.warning({
            title: this.$t('notice.n'),
            desc: this.$t('notice.n7'),
          });
          return false;
        }
        this.$store.commit('changeEthAddress', res[0]);
      } catch (error) {
        console.log(error);
        this.$Notice.warning({
          title: this.$t('notice.n'),
          desc: this.$t('notice.n8'),
        });
      }
    },

    // 将切换后的账户及时更新
    checkAccount(accounts) {
      if (accounts.length === 0) {
        // console.log('Please connect to MetaMask.');
        console.log('未连接账户');
        this.$Notice.warning({
          title: this.$t('notice.n'),
          desc: this.$t('notice.n9'),
        });
      } else if (accounts[0] !== this.ethAddress) {
        this.$store.commit('changeEthAddress', accounts[0]);
      }
    },

    // 检测eth账号切换
    checkStatus() {
      window.ethereum.on('accountsChanged', (accounts) => {
        this.checkAccount(accounts);
      });
      window.ethereum.on('networkChanged', (network) => {
        this.$store.commit('changeEthChainID', network);
        this.$Notice.warning({
          title: this.$t('notice.n'),
          desc: this.$t('notice.n10'),
        });
        // 切换后刷新页面从而刷新相关的数据
        let timer = setTimeout(() => {
          window.location.reload();
          clearTimeout(timer);
        }, 1000);
      });
    },

    // 检查是否连接
    async isEthConnect() {
      try {
        let res = await web3.eth.getCoinbase();
        return res;
      } catch (error) {
        console.log(error);
      }
    },

    // eth初始化
    async initEth() {
      try {
        let web3Provider;

        if (window.ethereum) {
          web3Provider = window.ethereum;
        } else if (window.web3) {
          // 老版 MetaMask Legacy dapp browsers...
          web3Provider = window.web3.currentProvider;
        } else {
          // console.log(error);
          this.$Notice.warning({
            title: this.$t('notice.n'),
            desc: this.$t('notice.n11'),
          });
          return false;
        }
        window.web3 = new Web3(web3Provider);
        let isConnect = await this.isEthConnect();

        if (!isConnect) {
          this.$Notice.warning({
            title: this.$t('notice.n'),
            desc: this.$t('notice.n1'),
          });
          return false;
        } else {
          // 获取当前chainId
          await this.getEthChainID();

          // 初始化合约
          await this.initContract();
          window.ethersprovider = new ethers.providers.Web3Provider(web3Provider);

          // 检测状态切换
          this.checkStatus();

          // 获取当前账号地址
          await this.getCurrentAccount();

          // 获取tlamb余额
          this.getTlambBalance();
        }
      } catch (error) {
        console.log(error);
        this.$Notice.warning({
          title: this.$t('notice.n12'),
        });
      }
    },

    // 获取LAMB余额
    async getLambBalance() {
      // console.log(this.lambdaAddress);
      if (!this.lambdaAddress) {
        this.$Notice.warning({
          title: this.$t('notice.n'),
          desc: this.$t('notice.n4'),
        });
        return false;
      }
      try {
        const res = await window.keplrlamb.getAccountbalance(this.lambdaAddress);
        let lambBalance =
          res.data &&
          res.data.value &&
          res.data.value.coins &&
          res.data.value.coins[0] &&
          res.data.value.coins[0].amount;

        if (!lambBalance) {
          lambBalance = 0;
        }

        this.$store.commit('changeLambBalance', lambBalance);
      } catch (error) {
        console.log(error);
        this.$Notice.warning({
          title: this.$t('notice.n'),
          desc: this.$t('notice.n13'),
        });
      }

      // console.log(res.data && res.data.value && res.data.value.coins && res.data.value.coins[0] && res.data.value.coins[0].amount);
    },

    // 获取 tlamb 余额
    async getTlambBalance() {
      if (!this.ethAddress) {
        this.$Notice.warning({
          title: this.$t('notice.n'),
          desc: this.$t('notice.n1'),
        });
        return false;
      }
      try {
        let tlambBalance = await this.contract.methods.balanceOf(this.ethAddress).call();
        this.$store.commit('changeTlambBalance', tlambBalance);
      } catch (error) {
        console.log(error);
        this.$Notice.warning({
          title: this.$t('notice.n'),
          desc: this.$t('notice.n14'),
        });
      }
    },

    // 初始合约
    async initContract() {
      let contractAddress;
      if (this.ethChainID === 1) {
        contractAddress = config.tlambMainContractAddress;
      } else if (this.ethChainID === 3) {
        contractAddress = config.tlambContractAddress;
      } else {
        console.log('已切换至别的网络');
      }
      // console.log({ contractAddress });
      let contract = await new web3.eth.Contract(tlambda, contractAddress);
      this.$store.commit('changeContract', contract);
    },

    // 监听Lambda钱包的chainID切换
    getLambdaChainID() {
      window.keplrlamb.listenChainId((chainID) => {
        // console.log(chainID);
        this.$store.commit('changeID', chainID);
        this.$Notice.warning({
          title: this.$t('notice.n'),
          desc: this.$t('notice.n10'),
        });
        let timer = setTimeout(() => {
          window.location.reload();
          clearTimeout(timer);
        }, 1000);
      });
    },

    // 获取语言key
    getKey() {
      let key = jscookie.get('langkey');
      key === 'zh' ? (this.lang = 'zh') : (this.lang = 'en');
      this.$i18n.locale = this.lang;
    },

    // 改变语言
    changeLang() {
      this.lang === 'zh' ? (this.lang = 'en') : (this.lang = 'zh');
      jscookie.set('langkey', this.lang, { expires: 180 });
      this.$i18n.locale = this.lang;
    },
  },

  mounted() {
    this.getKey();
    let time = setTimeout(() => {
      this.name = this.$route.name;
      // console.log(this.$route);
      this.initEth();
      this.initLamb();
      clearTimeout(time);
    }, 1000);
  },
  watch:{
    OpenethWallet:function(){
      if(this.OpenethWallet==true){
        this.openEth = true;
        this.$store.commit('changeOpenethWallet', false);

      }

    },
    OpenlambWallet:function(){
      if(this.OpenlambWallet==true){
        this.openLamb = true;
        this.$store.commit('changeOpenLamballet', false);

      }

    }
  }
};
</script>

<style lang="less" scoped>
#app {
  min-width: 1000px;
}
.container {
  display: flex;
  min-height: 100vh;
  .menu-aside {
    flex-basis: 180px;
    background-color: #393857;
    .logo {
      width: 150px;
      margin: 0 auto;
      margin-top: 25px;
      img {
        max-width: 100%;
      }
    }
    .connect-btn-wrapper {
      margin-top: 30px;
      padding-left: 30px;
      padding-right: 30px;
      .btn {
        width: 200px;
        height: 36px;
        img {
          max-width: 18px;
          margin-right: 5px;
        }
      }
      .eth {
        margin-top: 20px;
        img {
          max-width: 18px;
          margin-right: 5px;
        }
      }
    }

    .menu-router {
      margin-top: 20px;
      .menu-router-item {
        cursor: pointer;
        padding: 20px 30px;
        .item-wrapper {
          display: flex;
          flex-direction: row;
          align-items: center;
          .link {
            text-decoration: none;
            color: #fff;
            margin-left: 12px;
          }
        }
      }
      .menu-router-item-active {
        background: #30304d;
        border-right: 5px solid #9d9fff;
      }
    }
    .lang-wrapper {
      padding: 20px 30px;
      .lang {
        background: #4e4d68;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width: 180px;
        height: 36px;
        span {
          margin-right: 10px;
        }
      }
    }
  }
  .main-container {
    position: relative;
    overflow: hidden;
    flex-grow: 1;
    background: linear-gradient(224.85deg, rgba(37, 71, 193, 0.3) -6.91%, rgba(96, 30, 237, 0.3) 119.53%),
      linear-gradient(224.87deg, #3962f3 -7.71%, #a3a1ff 107.88%);
    .bg1 {
      position: absolute;
      width: 1853px;
      height: 945px;
      right: -219px;
      top: -861px;
      border-radius: 100%;
      transform: rotate(17deg);
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0) 100%);
      transform: matrix(0.99, 0.32, 0.12, -0.99, 0, 0);
    }
    .bg2 {
      position: absolute;
      width: 996px;
      height: 365.47px;
      /* left: 223px; */
      top: -288.18px;
      border-radius: 100%;
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0) 100%);
      transform: matrix(0.99, 0.12, 0.12, -0.99, 0, 0);
    }
  }
}
</style>
