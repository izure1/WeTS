import View from '@/View/View';
declare class Searcher {
    /**
     *
     * @param view      검색할 View 인스턴스입니다.
     * @param parent    대상 View 인스턴스입니다.
     * @param deep      깊은 탐색을 할지를 여부를 지정합니다.
     * @description     view 객체가 parent 객체의 하위에 존재하는지 여부를 검색하여 반환합니다.
     */
    static isChildren(view: View, parent: View, deep?: boolean): boolean;
    /**
     *
     * @param v         검색할 HTMLElement 인스턴스입니다.
     * @description     검색할 인스턴스의 부모 HTMLElement 를 검색하여 반환합니다.
     */
    static getParentElementFromChildren(v: HTMLElement | null): HTMLElement | null;
}
export default Searcher;
