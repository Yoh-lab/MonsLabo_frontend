# MonsLab_frontend
![Group 63](https://github.com/Yoh-lab/MonsLabo_frontend/assets/92442298/0660162c-1c33-49ba-be0d-0dc68dccbceb)

★をたくさん付けてあげてください！

## MonsLab_frontendの使い方
以下ではローカルでの実行手順を記載します。<br>
（デプロイ済みのリンクは[こちら](https://mons-labo-frontend.vercel.app/)）<br>

まず本レポジトリのクローンをお願いします。
```
git clone https://github.com/Yoh-lab/MonsLabo_frontend
```

次に`frontend_project`ディレクトリ直下に以下の`.env`ファイルが必要になります。<br>
（Firebaseのキーについては調べてください。）
```
VITE_FIREBASE_API_KEY=""
VITE_FIREBASE_AUTH_DOMAIN=""
VITE_FIREBASE_PROJECT_ID=""
VITE_FIREBASE_STORAGE_BUCKET=""
VITE_FIREBASE_MESSAGING_SENDER_ID=""
VITE_FIREBASE_APP_ID=""
VITE_FIREBASE_MEASUREMENT_ID=""
```

続いて`frontend_project`ディレクトリに移動し、必要なパッケージのインストールをお願いします。
```
npm install
```

その後ビルドをしてください。
```
npm run dev
```

## [MonsLab_backend](https://github.com/Yoh-lab/MonsLabo_backend)に関して
本プロジェクトにおいてモンスターとの会話を行うために利用しています。<br>
Railwayにデプロイ済みのリンクを用いているため、特に向こうのプロジェクトを立ち上げる必要はありません。<br>
（ローカルで実行してみたい場合は向こうのREADME参照）
