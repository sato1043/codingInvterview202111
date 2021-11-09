# Coding Interview 2021/11

2021/11 月、某社コーディングインタビューに提出したコードの改変です。

ウェブフロントエンド経験者の業務委託に関するインタビューです。

欲しいものがすべて書けたわけではありませんが、ご参考程度に。

## 経緯

フリーランスのソフトウエアエンジニアとして参加案件を探していたところ、
某エージェントからどうか某社をと推され、待つこと１週間。コーディングインタビューを設定される。

当日二日前、自前で React 実装環境を準備しておくよう要望があり、急ぎセットアップ。先方からの資料提供はありませんでした。

当日 React には詳しく触れず、方法は問わないがライフゲームを実装することと指示。
ライフゲームに興味がなく名前を知るのみでしたが、ルールは簡単だから今からググってくださいとのこと。
その瞬間からググりはじめて実装時間は実質２時間の査定でした。

```
インタビュータイムテーブル
- 会話開始 1000
- 設計開始 1040
- 実装終了 1245 (完了できず)
- レビュー ~1310 会話終了 - 査定自体はそれで終了
- 実装再開 1400 (面白かったので、個人的に)
- 動くまで実装 1530
```

ライフゲーム

- https://ja.wikipedia.org/wiki/%E3%83%A9%E3%82%A4%E3%83%95%E3%82%B2%E3%83%BC%E3%83%A0

デモ動作

https://user-images.githubusercontent.com/1756349/140847453-e4fb50a0-bbd5-436d-ab2b-47861e1998cd.mp4

競技コーダーの瞬発力が羨ましい。自分は不向きなので、事前に伺っていれば一目スルーだったのだけれども。時間を無駄にしました ^^;)

Zoom 画面共有してほしいとのことで共有したところ打鍵 10 打ったところが１、２しか返ってこない。これは〜まじやる気しない。笑

能力の足りないところは真摯に受け止めて精進しよう！

挑戦に対してよい体験が得られました。

## Environment

- Node.js v12 (npm)
- TypeScript v4
- React v17 with react hooks
- Next.js v10
- CSS modules

## Prerequisites

- node -v / npm -v
- npm install

```bash
$ node -v; npm -v
v12.22.7
6.14.15
```

## Getting started

```
$ cp .env.example .env
$ vi .env
$ npm start
$ npm run pre:push
```

## Update packages

```
$ npm outdated
$ npm update [packageName]
$ npm ci
```

or just run `npm ci` if others updates some with removing existing node_modules.

**EOF**
