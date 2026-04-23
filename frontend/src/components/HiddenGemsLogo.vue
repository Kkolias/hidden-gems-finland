<template>
  <div class="component-HiddenGemsLogo">
    <a class="home-link" href="/">
      <img src="/hgf-icon.svg" alt="Logo" height="40" />
      <div class="logo-text-container">
        <span class="logo-text">Hidden Gems</span>
        <span class="small-lime">Finland</span>
      </div>
    </a>
  </div>
</template>

<style lang="less" scoped>
.component-HiddenGemsLogo {
  a {
    text-decoration: none;
    font-weight: 600;

    &.active {
      text-decoration: underline;
    }
  }

  .home-link {
    display: flex;
    align-items: center;

    .logo-text-container {
      display: flex;
      flex-direction: column;
      line-height: 1;
      height: 40px;
      justify-content: space-between;
    }

    .logo-text {
      margin-left: 8px;
      font-size: 2.2rem;
      font-weight: 700;
      color: var(--text-light);
      font-family: var(--font-title);
      line-height: 1;
    }

    .small-lime {
      margin-left: 8px;
      font-size: 1.6rem;
      line-height: 1.5;
      font-weight: 700;
      color: var(--lime);
      font-family: var(--font-title);
      line-height: 1;
    }
  }

  &.big {
    .home-link {
      .logo-text {
        width: 100px;
      }
    }
  }
}
</style>
