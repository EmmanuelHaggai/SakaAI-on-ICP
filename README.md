# SakaAI-on-ICP

Welcome to the official repository of SakaAI-on-ICP, the pioneering AI-driven chat interface that harnesses the power of the Internet Computer Protocol (ICP) blockchain to deliver secure, decentralized, and intelligent interactions directly through WhatsApp.

## Overview

SakaAI-on-ICP is designed to revolutionize the way users access information and services. By integrating advanced AI capabilities with the robust, secure, and scalable infrastructure of the ICP blockchain, SakaAI offers a new dimension of privacy, efficiency, and personalization in digital communication. Accessible through the familiar interface of WhatsApp, SakaAI makes it effortless for users to perform a wide range of tasks - from securing transactions and accessing information to receiving personalized recommendations and managing daily activities.

## Some usefull links
- SakaAI Frontend Canister: https://lsqqh-hyaaa-aaaap-qcabq-cai.icp0.io/
- SakaAI Backend Canister:  https://a4gq6-oaaaa-aaaab-qaa4q-cai.raw.icp0.io/?id=lvrwt-kaaaa-aaaap-qcaba-cai

## Features

- **Blockchain-Enhanced Security:** Leveraging the ICP blockchain, SakaAI ensures end-to-end encryption and data integrity, offering users a secure platform for their digital interactions.
- **AI-Powered Conversations:** SakaAI employs sophisticated AI algorithms to understand and respond to user queries in real-time, providing a seamless and intuitive chat experience.
- **Decentralized Accessibility:** Built on the ICP ecosystem, SakaAI promotes a decentralized approach, allowing for greater user control and privacy.
- **Multi-Service Integration:** SakaAI is designed to integrate with a multitude of services and decentralized applications (dApps), enabling users to access a wide array of functionalities directly through WhatsApp.
- **Global Reach with Local Relevance:** With support for multiple languages and localization features, SakaAI aims to serve users across the globe, catering to their specific needs and preferences.

## Getting Started

To start integrating SakaAI into your daily WhatsApp use, use this link [https://lsqqh-hyaaa-aaaap-qcabq-cai.icp0.io/](https://lsqqh-hyaaa-aaaap-qcabq-cai.icp0.io/)


## Installation
Follow these steps to set up SakaGPT on your local environment:

### Prerequisites

- A connection to the internet.
- A command line interface.
- [Node.js](https://nodejs.org/en) (v18 or later downloaded and installed.)
- [DFINITY IC SDK,](https://internetcomputer.org/docs/current/developer-docs/setup/install/)
```bash
sh -ci "$(curl -fsSL https://internetcomputer.org/install.sh)"
```
- dfx (v15 or later installed.)
  ```bash
  sh -ci "$(curl -fsSL https://sdk.dfinity.org/install.sh)"
  
  dfx --version

  echo 'export PATH="$PATH:$HOME/bin"' >> "$HOME/.bashrc"
  ```
   
### Steps

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/EmmanuelHaggai/SakaAI-on-ICP.git
   
   cd SakaAI-on-ICP
   ```
   
2. **Install Dependencies:**

   ```bash
   npm install @dfinity/auth-client
   
   npm install
   ```
3. **Pull the interner identity canister using dfx deps:**
   ```bash
   dfx deps pull
   ```
4. **Initialize the canister:**
   ```bash
   dfx deps init internet_identity --argument '(null)'
   ```
5. **Deploy to Internet Computer:**

   ```bash
   dfx start --clean --background
   dfx deps deploy
   dfx deploy
   ```

## Contribute

SakaAI-on-ICP is an open-source project, and we welcome contributions from the community. Whether it's adding new features, improving existing ones, or helping with documentation, your contributions are invaluable to us.

Join us in redefining the future of chat-based interactions with blockchain technology and AI. Together, we can build a smarter, more secure, and more connected world.


