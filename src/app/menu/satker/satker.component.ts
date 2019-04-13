import { Component, OnInit, OnDestroy  } from '@angular/core';
import { BaseComponent } from '../../shared/base/base.component';
import { Router } from '@angular/router';
import { SatkerService } from './satker.service';
import { Satker } from './satker';
import { Pesan } from '../../shared/pesan/pesan';
import { Store } from '@ngxs/store';
import { LoginUser } from '../../store/actions/user.action';
import { Subscription, Subject} from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
declare var jQuery: any;
declare var pdfMake: any;

@Component({
    selector: 'app-satker', // moduleId: module.id,
    templateUrl: './satker.component.html',

})

export class SatkerComponent extends BaseComponent implements OnInit,OnDestroy  {

    public isiSatker: Satker;
    public listSatker: Satker[];
    public satkerIni: Satker;

    public ubah: number = 0;

    private _rekam = 0;
    private _index = 0;
    private satkersub:Subscription;
    private detailsub:Subscription;
    satkernya = new Subject();

    private kdsatkernya;
    

    public maskkdsatker = [/[0-9]/, /\d/, /\d/];


    p: number = 1;
    //isikan untuk pesan
    setPesan: Pesan;

    constructor(private router: Router, public satkerservice: SatkerService,private store:Store) {
        super();

    }

    public closeForm(): void {

        let link = ['/menu/kosong'];
        this.router.navigate(link);

    }


    ngOnInit(): void {
        this.isiSatker = {
            "kdsatker": "",
            "nmsatker": ""

        };

        if(this.satkersub){
            this.satkersub.unsubscribe();
        }
        this.ajax = 0;
        this.satkersub=this.satkerservice.getSatker()
            .subscribe(
                data => {
                    this.listSatker = data;
                    setTimeout(() => {
                        this.ajax = 1;
                    }, 3000);

                },
                error => {
                    alert("Error get data satker");
                    return;
                   
                }
            );


    }

    public cetak(){


        var dd = {
            content: [
                'First paragraph',
                'Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines'
            ]
            
        }
        pdfMake.createPdf(dd).open();
        
    }

    public tampilkan(){
        // if(this.satkersub){
        //     this.satkersub.unsubscribe();
        // }
        this.ajax = 0;
        setTimeout(() => {
            this.satkersub=this.satkerservice.getSatker()
            .subscribe(
                data => {
                    this.listSatker = data;
                    setTimeout(() => {
                        this.ajax = 1;
                    }, 3000);

                },
                error => {
                    alert("Error get data satker");
                    return;
                   
                }
            );
        }, 1000);
        
    }

    public detail(satkerinilho:Satker){

        if(this.detailsub){
            this.detailsub.unsubscribe();
        }

        setTimeout(() => {
            this.detailsub=this.satkerservice.getDetailSatker(satkerinilho.kdsatker)
            .subscribe(data=>{
                console.log(data);
            })
        }, 1000);
     
        // console.log(satkerinilho)
        // let kdsaterPilih=satkerinilho.kdsatker;
        // this.satkernya
        // .pipe(
        //   switchMap((kdsaterPilih) =>
        //     this.satkerservice.getDetailSatker(kdsaterPilih),
        //   ),
        //   map((res: Response) => res.json()),
        // )
        // .subscribe(res => {
        //     console.log("akhir")
        //     console.log(res)
        // })
        // let kdnya=satkernya.kdsatker;
        //     this.kdsatkernya
        //     .switchMap((kdnya) => this.satkerservice.getDetailSatker(kdnya)
        //     .subscribe(res => console.log(res)))
    }

    public rekamData(): void {

        this.matiTeks(false);
        this.kosong();

        jQuery('#ctnRekam').modal('show');

        this._rekam = 1;
        setTimeout(function () {
            jQuery('#kdsatker').focus();
        }, 500);


    }

    public kosong(): void {
        this.isiSatker.kdsatker = '';
        this.isiSatker.nmsatker = '';

    }

    /**
     * menghidupkan dan mematikan teks
     */
    public matiTeks(isi: boolean): void {

        jQuery('#kdsatker').prop('readonly', isi);
        jQuery('#nmsatker').prop('readonly', isi);

    }

    public editData(satkerPilih: Satker): void {

        //cari index untuk proses splice
        this._index = this.listSatker.indexOf(satkerPilih);

        jQuery('#kdsatker').prop('readonly', true);

        this.isiSatker.kdsatker = satkerPilih.kdsatker;
        this.isiSatker.nmsatker = satkerPilih.nmsatker;


        this._rekam = 0;
        jQuery('#ctnRekam').modal('show');

        //focus
        setTimeout(function () {
            jQuery('#nmsatker').focus();
        }, 500);
    }

    public saveData(): void {

        if (this.isiSatker.kdsatker.trim().length === 0) {

            this.setPesan = {
                "judulPesan": "Warning",
                "isiPesan": "Isian Kode Satker tidak boleh kosong",
                "jenisPesan": 1
            };
            setTimeout(function () {
                jQuery('#ctnpesan').modal('show');
            }, 100);

            setTimeout(function () {
                jQuery('#kdsatker').focus();
            }, 3000);
            return;
        } else {
            let iHas = this.replaceAll(this.isiSatker.kdsatker, "_", "");
            if (iHas.length < 2) {
                this.setPesan = {
                    "judulPesan": "Warning",
                    "isiPesan": "Isian Kode Satker harus 6 digit",
                    "jenisPesan": 1
                };
                setTimeout(function () {
                    jQuery('#ctnpesan').modal('show');
                }, 100);

                setTimeout(function () {
                    jQuery('#kdsatker').focus();
                }, 3000);
                return;
            }
        }

        if (this.isiSatker.nmsatker.trim().length === 0) {

            this.setPesan = {
                "judulPesan": "Warning",
                "isiPesan": "Isian nama satker tidak boleh kosong",
                "jenisPesan": 1
            };
            setTimeout(function () {
                jQuery('#ctnpesan').modal('show');
            }, 100);

            setTimeout(function () {
                jQuery('#nmsatker').focus();
            }, 3000);
            return;
        }


        var nilaiSimpan = {
            "kdsatker": this.isiSatker.kdsatker,
            "nmsatker": this.isiSatker.nmsatker


        };

            if (this._rekam == 1) {
                this.satkerservice.cekSatker(nilaiSimpan)
                    .subscribe((hasil) => {
                        let nAda = hasil.length;
                        if (nAda > 0) {
                            this.setPesan = {
                                "judulPesan": "Warning",
                                "isiPesan": "Isian Kode ini sudah ada!",
                                "jenisPesan": 1
                            };
                            setTimeout(function() {
                            jQuery('#ctnpesan').modal('show');    
                            }, 100);
                            setTimeout(function () {
                                jQuery('#kdkategori').focus();
                            }, 3000);
                            return;

                        } else {

                            this.listSatker.push(nilaiSimpan);
                            this.satkerservice.saveSatker(nilaiSimpan)
                                .subscribe(
                                data => console.log(data),
                                error => alert(error)
                                );
                            // console.log('save component');
                            this._rekam = 0;
                            jQuery('#ctnRekam').modal('hide');
                        }

                    });
            } else {
                this.listSatker.splice(this._index, 1, nilaiSimpan);
                this.satkerservice.updateSatker(nilaiSimpan)
                    .subscribe(
                    data => console.log(data),
                    error => alert(error)
                    );
                this._rekam = 0;
                jQuery('#ctnRekam').modal('hide');
            }

    }


    public yesHapus(message: string): void {

        var paramJson = { "kdsatker": this.satkerIni.kdsatker };

        this.satkerservice.hapusSatker(paramJson)
            .subscribe(
            data => console.log(data),
            error => alert(error)
            );
        this.listSatker.splice(this._index, 1);


    }

    public hapusData(satkerPilih: Satker): void {

        //dapatkan nomor indexnya array object
        this._index = this.listSatker.indexOf(satkerPilih);
        this.satkerIni = satkerPilih;
        this.setPesan = {
            "judulPesan": "Konfirmasi Hapus",
            "isiPesan": "Yakin akan menghapus KPPN ini?",
            "jenisPesan": 2
        };
        setTimeout(function () {
            jQuery('#ctnpesan').modal('show');
        }, 100);


    }

    cancleSatker(){

        // if(this.satkersub){
            this.satkersub.unsubscribe();
        // }
        // console.log('cancle1')
        // this.satkersub.unsubscribe();
        // console.log('cancle2')
    }

    ngOnDestroy(): void {
        //Called once, before the instance is destroyed.
        //Add 'implements OnDestroy' to the class.
        this.satkersub.unsubscribe();
    }





}