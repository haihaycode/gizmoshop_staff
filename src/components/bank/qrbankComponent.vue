<script>
import { createQRBank } from '@/api/qrbankApi'
import bankData from '@/assets/codebank.json';

export default {
    name: 'QrBankComponent',
    data() {
        return {
            banks: bankData,
            dataQrCode: {
                bin: '',
                accountNo: '',
                accountName: '',
                amount: '',
                addInfo: '',
            }
        };
    },
    props: {
        infoQr: {
            type: Object,
            required: true,
        },
    },
    emits: ['succes'],
    methods: {
        async fetchBankDetails() {
            try {
                this.$emit('succes', 'calling');
                const response = await createQRBank(this.dataQrCode);
                console.log(response);
                this.$emit('succes', response.data);
            } catch (error) {
                console.error('Lỗi khi gọi API:', error);
                this.$emit('api-result', error);
            }
        },
        updateDataQrCode(newCode) {
            const selectedBank = this.banks.find(bank =>
                bank.name.replace(/\s+/g, '').toLowerCase() === newCode.nameBank.replace(/\s+/g, '').toLowerCase()
            );

            if (selectedBank) {
                // Cập nhật lại dataQrCode với dữ liệu mới, xóa dữ liệu cũ
                this.dataQrCode = {
                    bin: selectedBank.code,
                    accountNo: newCode.accountNo,
                    accountName: newCode.accountName,
                    amount: newCode.amount,
                    addInfo: newCode.addInfo || '',
                };
                this.fetchBankDetails(); // Gọi API để lấy dữ liệu mới
            } else {
                console.error('Không tìm thấy ngân hàng: ' + newCode.nameBank);
                this.$emit('succes','error');
            }
        }
    },
    watch: {
        infoQr: {
            deep: true,
            handler(newCode) {
                this.updateDataQrCode(newCode); // Cập nhật lại dữ liệu mỗi khi infoQr thay đổi
            },
        },
    }
};
</script>
