<template>
    <div>
        <span class="text-base text-gray-200">{{ formattedTime }}</span>
    </div>
</template>

<script>
export default {
    data() {
        return {
            startTime: null,
            timer: null,
            elapsedTime: 0, // in seconds
        };
    },
    computed: {
        formattedTime() {
            const hours = Math.floor(this.elapsedTime / 3600);
            const minutes = Math.floor((this.elapsedTime % 3600) / 60);
            const seconds = this.elapsedTime % 60;
            return `${hours} giờ ${minutes} phút ${seconds} giây`;
        },
    },
    methods: {
        startTimer() {
            this.timer = setInterval(() => {
                this.elapsedTime = Math.floor((Date.now() - this.startTime) / 1000); // Convert to seconds
            }, 1000); // Update every second
        },
        stopTimer() {
            clearInterval(this.timer);
        },
    },
    mounted() {
        // Check if a start time is stored in local storage
        const storedStartTime = localStorage.getItem('startTime');
        if (storedStartTime) {
            this.startTime = parseInt(storedStartTime, 10); // Set startTime from local storage
            this.elapsedTime = Math.floor((Date.now() - this.startTime) / 1000); // Calculate elapsed time from stored start time
        } else {
            this.startTime = Date.now(); // Initialize startTime to current time if none is stored
            localStorage.setItem('startTime', this.startTime); // Store the current start time in local storage
        }
        this.startTimer(); // Start the timer when the component is mounted
    },
    beforeUnmount() {
        this.stopTimer(); // Clear the timer when the component is destroyed
        localStorage.setItem('startTime', this.startTime); // Save the current start time in local storage
    },
};
</script>

<style scoped>
/* Add any additional styles if needed */
</style>
