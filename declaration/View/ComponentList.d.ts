import Component from './Component';
declare class ComponentList {
    [key: string]: Component;
    /**
     *
     * @param component     추가할 컴포넌트 인스턴스입니다.
     * @description         컴포넌트 인스턴스를 리스트에 추가합니다.
     */
    static add(componentList: ComponentList, component: Component): void;
}
export default ComponentList;
