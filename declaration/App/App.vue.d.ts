import { Vue } from 'vue-property-decorator';
export default class App extends Vue {
    private app;
    private LevelDesign;
    private resizeObserver;
    private appScale;
    /**
     * @description     사용자 입력 이벤트를 발생시킵니다.
     */
    private emitUserInput;
    /**
     * @description     스크린 크기가 변경되었을 때, 전체적인 앱의 크기를 재조정합니다.
     */
    private onScreenChange;
    created(): void;
    mounted(): void;
    beforeDestroy(): void;
}
