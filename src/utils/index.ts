export class Utils {
    /**
     * Function to generate unique id
     *
     * @return { string } - generated id
     */
    public static generateUniqueId(): string {
        return Math.random().toString(16).slice(2);
    }
}
