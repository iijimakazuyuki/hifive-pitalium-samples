/*
 * Copyright (C) 2015 NS Solutions Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

(function () {
  'use strict';

  /**
   * three.jsでWebGLを実行するサンプルコントローラ
   *
   * @class sample.SampleController
   */
  var SampleController = {
    __name: 'sample.SampleController',

    /**
     * @type {JQuery}
     */
    _$root: null,

    /**
     * @type {THREE.Scene}
     */
    _scene: null,
    /**
     * @type {THREE.PerspectiveCamera}
     */
    _camera: null,
    /**
     * @type {THREE.WebGLRenderer}
     */
    _renderer: null,

    __ready: function () {
      this._$root = this.$find('#container');

      // 初期化
      this._initialize();

      // レンダリング開始
      this._render();
    },

    /**
     * three.jsの初期化を行う。
     *
     * @private
     */
    _initialize: function () {
      var width = this._$root.width();
      var height = this._$root.height();

      // カメラセットアップ
      var camera = this._camera = new THREE.PerspectiveCamera(50, width / height);
      camera.position.set(300, 200, 200);
      camera.lookAt(new THREE.Vector3());

      // カメラコントロールセットアップ
      new THREE.OrbitControls(camera, this._$root[0]);

      // WebGLのレンダラセットアップ
      var renderer = this._renderer = new THREE.WebGLRenderer({
        antialias: true
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setClearColor(0x888888);
      this._$root.append(renderer.domElement);

      // シーンのセットアップ
      var scene = this._scene = new THREE.Scene();
      scene.add(new THREE.AmbientLight(0xe0e0e0));
      scene.add(new THREE.DirectionalLight(0xffffff));
      scene.add(new THREE.AxisHelper(1000));

      // 床を追加
      var floor = new THREE.Mesh(
        new THREE.PlaneGeometry(1000, 1000, 1, 1).rotateX(Math.PI / 2),
        new THREE.MeshPhongMaterial({
          color: 0xffffff,
          side: THREE.DoubleSide
        })
      );
      floor.position.y = -1;
      scene.add(floor);

      // オブジェクトを追加
      var object = new THREE.Mesh(
        new THREE.BoxGeometry(50, 50, 50),
        new THREE.MeshPhongMaterial({
          color: 0x00ff00,
          transparent: true
        })
      );
      object.position.set(50, 80, 40);
      scene.add(object);
    },

    /**
     * レンダリングを実行する。
     *
     * @private
     */
    _render: function () {
      requestAnimationFrame(this.own(this._render));

      // レンダリング
      this._renderer.render(this._scene, this._camera);
    }
  };

  h5.core.expose(SampleController);

})();