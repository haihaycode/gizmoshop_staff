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
                const response = await createQRBank(this.dataQrCode);
                console.log(response)
                this.$emit('succes', response.data);
            } catch (error) {
                console.error('Lỗi khi gọi API:', error);
                this.$emit('api-result', error);
            }
        },
    },
    watch: {
        infoQr: {
            deep: true,
            handler(newCode) {
                // Tìm ngân hàng trong mảng 'banks' bằng tên ngân hàng 'newCode.nameBank'
                const selectedBank = this.banks.find(bank =>
                    bank.name.replace(/\s+/g, '').toLowerCase() === newCode.nameBank.replace(/\s+/g, '').toLowerCase()
                );

                if (selectedBank) {
                    // Cập nhật 'dataQrCode' nếu tìm thấy ngân hàng
                    this.dataQrCode = {
                        bin: selectedBank.code,  // Mã ngân hàng
                        accountNo: newCode.accountNo,  // Số tài khoản từ newCode
                        accountName: newCode.accountName,  // Tên chủ tài khoản từ newCode
                        amount: newCode.amount,  // Số tiền từ newCode
                        addInfo: newCode.addInfo || '',  // Thông tin bổ sung nếu có từ newCode
                    };

                    // Gọi hàm fetchBankDetails để lấy kết quả API sau khi cập nhật 'dataQrCode'
                    this.fetchBankDetails();
                } else {
                    console.error('Không tìm thấy ngân hàng: ' + newCode.nameBank);
                }
            },
        },
    }
};
</script>