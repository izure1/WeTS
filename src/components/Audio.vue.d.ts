import { Vue } from 'vue-property-decorator';
export default class VueComponent extends Vue {
    private app;
    private scene;
    private body;
    private static readonly EmptySound;
    private audio;
    private intervalIndex;
    private readonly AssetLoader;
    private readonly HowlerToWorld;
    private readonly HowlerConfig;
    /**
     * @description         주어진 src를 통해 오디오를 새롭게 불러옵니다.
     */
    private loadAudio;
    /**
     * @param el        대상 HTMLElement 인스턴스입니다.
     * @description     대상 HTMLElement 인스턴스의 translate.z 좌표를 반환합니다.
     */
    private getComputedTranslateZ;
    /**
     * @description     현재 오디오의 위치에 따라 오디오 3D 효과를 변경합니다.
     */
    private observeAudioPosition;
    private destroyObserver;
    private onChangeAudio;
    private onChangeAudioSrc;
    private onChangeAudioLoop;
    private onChangeAudioMuted;
    private onChangeAudioPlaybackRate;
    private onChangeAudioVolume;
    created(): void;
    mounted(): void;
    beforeDestroy(): void;
}
