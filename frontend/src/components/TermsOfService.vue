<template>
  <div class="component-TermsOfService">
    <h1>Terms of Service</h1>
    <div class="content">
      <p class="last-updated">Last updated: April 2026</p>

      <section>
        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing and using Hidden Gems Finland, you agree to be bound by these Terms of Service. If you
          do not agree to these terms, please do not use this website.
        </p>
      </section>

      <section>
        <h2>2. User Contributions</h2>
        <p>
          This website allows users to submit and share locations they consider to be "hidden gems."
          By submitting a location, you:
        </p>
        <ul>
          <li>Confirm that you have the right to share this information</li>
          <li>Ensure the location is appropriate and safe for public viewing</li>
          <li>Understand that your submission will be publicly visible</li>
        </ul>
      </section>

      <section>
        <h2>3. Prohibited Content</h2>
        <p>You may not submit locations that:</p>
        <ul>
          <li>Are on private property without permission</li>
          <li>Are illegal or could facilitate illegal activities</li>
          <li>Could harm people or wildlife</li>
          <li>Contain sensitive or protected areas</li>
        </ul>
      </section>

      <section>
        <h2>4. Disclaimer</h2>
        <p>
          This website is provided "as is." We make no warranties about the accuracy, safety, or
          accessibility of any submitted locations. Users visit these locations at their own risk.
        </p>
      </section>

      <section>
        <h2>5. Limitation of Liability</h2>
        <p>
          Hidden Gems Finland and its operator are not responsible for any damages arising from the use
          or inability to use this website, or from any user-submitted content.
        </p>
      </section>

      <section>
        <h2>6. Intellectual Property</h2>
        <p>
          The website design and code are owned by the developer. Location data submitted by users
          is contributed freely to the community.
        </p>
      </section>

      <section>
        <h2>7. Contact</h2>
        <p>
          For questions about these terms, contact:
          <a href="mailto:dev.elias.koivuporras@gmail.com">dev.elias.koivuporras@gmail.com</a>
        </p>
      </section>
    </div>
  </div>
</template>


<style lang="less" scoped>
.component-TermsOfService {
  padding: 24px;
  padding-top: 70px;
  max-width: 800px;
  margin: auto;

  h1 {
    font-size: 3.2rem;
  }

  h1, h2 {
    text-align: left;
  }

  .last-updated {
    color: #666;
    margin-bottom: 32px;
  }

  .content {
    line-height: 1.7;
  }

  section {
    margin-top: 32px;

    h2 {
      font-size: 1.4rem;
      margin-bottom: 12px;
    }

    p {
      margin: 12px 0;
    }

    ul {
      margin: 12px 0 12px 24px;

      li {
        margin: 8px 0;
      }
    }
  }

  @media (max-width: 600px) {
    h1 {
      font-size: 2.8rem;
    }
  }
}
</style>